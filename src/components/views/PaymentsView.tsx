import { Payment, Motorbike } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentsProps {
  payments: Payment[];
  onAddPayment: (payment: Payment) => void;
  bikes: Motorbike[];
}

export const PaymentsView = ({ payments, onAddPayment, bikes }: PaymentsProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSimulatePayment = () => {
    const bike = bikes[0];
    const newPayment: Payment = {
      id: Math.random().toString(36).substr(2, 9),
      bikeId: bike.id,
      bikeModel: bike.model,
      customerName: 'New Customer',
      amount: 120.00,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };
    onAddPayment(newPayment);
    toast.success('Payment recorded successfully');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">Track rental revenue and customer transactions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2" onClick={handleSimulatePayment}>
            <Plus className="h-4 w-4" /> Record Payment
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by customer or ID..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Bike Model</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.customerName}</TableCell>
                  <TableCell>{payment.bikeModel}</TableCell>
                  <TableCell className="font-semibold">${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'} className={payment.status === 'completed' ? "bg-emerald-500" : ""}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Receipt</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};