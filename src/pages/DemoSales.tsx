import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mic, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  productName: string;
  quantity: number;
  status: 'Success' | 'Failed';
}

const DemoSales = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [cart, setCart] = useState<Array<{ name: string; quantity: number; price: number }>>([]);
  const [paymentType, setPaymentType] = useState('success');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', productName: 'Product A', quantity: 2, status: 'Success' },
    { id: '2', productName: 'Product B', quantity: 1, status: 'Failed' },
    { id: '3', productName: 'Product C', quantity: 3, status: 'Success' },
  ]);
  const { toast } = useToast();

  const addToSale = () => {
    if (!productName || !price) {
      toast({
        title: "Missing Information",
        description: "Please enter product name and price",
        variant: "destructive",
      });
      return;
    }

    setCart([...cart, { name: productName, quantity, price: parseFloat(price) }]);
    setProductName('');
    setQuantity(1);
    setPrice('');
    
    toast({
      title: "Item Added",
      description: `${productName} added to sale`,
    });
  };

  const processSale = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to the sale first",
        variant: "destructive",
      });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      productName: cart.map(item => item.name).join(', '),
      quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
      status: paymentType === 'success' ? 'Success' : 'Failed',
    };

    setTransactions([newTransaction, ...transactions]);
    setCart([]);
    
    toast({
      title: paymentType === 'success' ? "Payment Successful" : "Payment Failed",
      description: `Transaction ${paymentType === 'success' ? 'completed' : 'failed'}`,
      variant: paymentType === 'success' ? 'default' : 'destructive',
    });
  };

  const simulatePayment = () => {
    toast({
      title: "Payment Simulated",
      description: `Simulated ${paymentType === 'success' ? 'successful' : 'failed'} payment`,
      variant: paymentType === 'success' ? 'default' : 'destructive',
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-foreground mb-8">Simulate Sales Transactions</h1>

        {/* Sales Entry Section */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label htmlFor="product" className="text-foreground mb-2">Product Name</Label>
              <Input
                id="product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="quantity" className="text-foreground mb-2">Quantity</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-background"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="bg-background border-border text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-background"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="price" className="text-foreground mb-2">Price</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={addToSale} variant="outline" className="bg-background">
              Add to Sale
            </Button>
            <Button onClick={processSale} className="bg-primary hover:bg-primary/90">
              Process Sale
            </Button>
          </div>
        </div>

        {/* UPI Payment Simulation */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">UPI Payment Simulation</h2>
          <RadioGroup value={paymentType} onValueChange={setPaymentType} className="mb-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="success" id="success" />
              <Label htmlFor="success" className="text-foreground cursor-pointer">Simulate Successful Payment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="failed" id="failed" />
              <Label htmlFor="failed" className="text-foreground cursor-pointer">Simulate Failed Payment</Label>
            </div>
          </RadioGroup>
          <Button onClick={simulatePayment} className="w-full md:w-auto bg-background hover:bg-muted text-foreground border border-border">
            Simulate Payment
          </Button>
        </div>

        {/* Voice Command */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-primary/10 border-primary hover:bg-primary/20 text-primary px-8"
            >
              <Mic className="w-6 h-6 mr-3" />
              Activate Voice Command for Quick Sale Entry
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Transaction History</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-4 bg-background rounded-lg border border-border"
              >
                <span className="text-foreground">{transaction.productName}</span>
                <span className="text-muted-foreground">Quantity: {transaction.quantity}</span>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    transaction.status === 'Success'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  Status: {transaction.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSales;
