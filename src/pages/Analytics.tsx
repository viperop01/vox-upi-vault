import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const topItems = [
  { name: 'Item A', value: 400 },
  { name: 'Item B', value: 300 },
  { name: 'Item C', value: 200 },
  { name: 'Item D', value: 100 },
];

const trendData = [
  { category: 'Electronics', value: 450 },
  { category: 'Fashion', value: 350 },
];

const COLORS = ['hsl(24, 95%, 53%)', 'hsl(217, 91%, 60%)', 'hsl(24, 95%, 63%)', 'hsl(217, 91%, 70%)'];

const Analytics = () => {
  const [showTrends, setShowTrends] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Sales Analytics</h1>
          <Button
            onClick={() => setShowTrends(!showTrends)}
            className="bg-primary hover:bg-primary/90"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            {showTrends ? 'Hide' : 'Show'} Trends
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Sales Performance */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Sales Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                <XAxis dataKey="month" stroke="hsl(0 0% 65%)" />
                <YAxis stroke="hsl(0 0% 65%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 12%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="sales" stroke="hsl(24, 95%, 53%)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Items */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Top Performing Items</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topItems} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                <XAxis type="number" stroke="hsl(0 0% 65%)" />
                <YAxis dataKey="name" type="category" stroke="hsl(0 0% 65%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 12%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="hsl(24, 95%, 53%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Trends */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Sales Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trendData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 12%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customize Data View */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Customize Data View</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-foreground mb-2 block">Date Range:</label>
              <Input type="date" className="bg-background border-border" />
            </div>
            <div>
              <label className="text-foreground mb-2 block">Category:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="category" value="all" defaultChecked />
                  All
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="category" value="electronics" />
                  Electronics
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="category" value="fashion" />
                  Fashion
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
