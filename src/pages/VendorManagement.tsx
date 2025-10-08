import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor A', contact: '123-456-7890', location: 'Market Street' },
    { id: 2, name: 'Vendor B', contact: '987-654-3210', location: 'Central Plaza' },
  ]);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-foreground mb-8">Vendor Management</h1>
        
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Add New Vendor</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="vendor-name">Vendor Name</Label>
              <Input id="vendor-name" placeholder="Enter vendor name" className="bg-background border-border" />
            </div>
            <div>
              <Label htmlFor="vendor-contact">Contact</Label>
              <Input id="vendor-contact" placeholder="Enter contact" className="bg-background border-border" />
            </div>
            <div>
              <Label htmlFor="vendor-location">Location</Label>
              <Input id="vendor-location" placeholder="Enter location" className="bg-background border-border" />
            </div>
          </div>
          <Button className="mt-6 bg-primary hover:bg-primary/90">Add Vendor</Button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Vendor List</h2>
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex justify-between items-center p-4 bg-background rounded-lg border border-border">
                <div>
                  <p className="text-foreground font-semibold">{vendor.name}</p>
                  <p className="text-muted-foreground text-sm">{vendor.contact}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">{vendor.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
