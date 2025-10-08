import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, paymentMethod = 'cash' } = await req.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Items array is required');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization required');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get user from auth
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    // Create sale transaction
    const productNames = items.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    const totalQuantity = items.reduce((sum, item) => sum + parseInt(item.quantity), 0);

    const { data: transaction, error: txError } = await supabaseClient
      .from('transactions')
      .insert({
        user_id: user.id,
        transaction_type: 'sale',
        amount: totalAmount,
        status: 'success',
        payment_method: paymentMethod,
        product_names: productNames,
        quantity: totalQuantity,
        description: `Sale transaction`
      })
      .select()
      .single();

    if (txError) {
      console.error('Transaction insert error:', txError);
      throw new Error('Failed to create sale transaction');
    }

    // Update inventory for each item
    for (const item of items) {
      const { error: inventoryError } = await supabaseClient
        .from('inventory')
        .update({ 
          quantity: supabaseClient.rpc('decrement', { 
            row_id: item.inventoryId,
            decrement_by: parseInt(item.quantity) 
          })
        })
        .eq('id', item.inventoryId)
        .eq('user_id', user.id);

      if (inventoryError) {
        console.error('Inventory update error:', inventoryError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        transactionId: transaction.id,
        totalAmount: totalAmount,
        items: items,
        message: 'Sale completed successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in create-sale function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
