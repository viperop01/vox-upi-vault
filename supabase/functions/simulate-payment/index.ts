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
    const { amount, productNames, quantity, shouldSucceed = true } = await req.json();
    
    if (!amount || !productNames) {
      throw new Error('Amount and product names are required');
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

    // Simulate UPI payment processing
    const isSuccess = shouldSucceed && Math.random() > 0.1; // 90% success rate
    const status = isSuccess ? 'success' : 'failed';
    const upiTransactionId = isSuccess ? `UPI${Date.now()}${Math.random().toString(36).substr(2, 9)}` : null;

    // Create transaction record
    const { data: transaction, error: txError } = await supabaseClient
      .from('transactions')
      .insert({
        user_id: user.id,
        transaction_type: 'payment',
        amount: parseFloat(amount),
        status: status,
        payment_method: 'upi',
        upi_transaction_id: upiTransactionId,
        product_names: productNames,
        quantity: quantity || 1,
        description: `UPI payment for ${productNames}`
      })
      .select()
      .single();

    if (txError) {
      console.error('Transaction insert error:', txError);
      throw new Error('Failed to create transaction record');
    }

    // If payment successful, update wallet balance
    if (isSuccess) {
      const { error: walletError } = await supabaseClient.rpc('update_wallet_balance', {
        p_user_id: user.id,
        p_amount: parseFloat(amount)
      });

      if (walletError) {
        console.error('Wallet update error:', walletError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: isSuccess,
        status: status,
        transactionId: transaction.id,
        upiTransactionId: upiTransactionId,
        amount: amount,
        message: isSuccess 
          ? 'Payment processed successfully' 
          : 'Payment failed. Please try again.'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in simulate-payment function:', error);
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
