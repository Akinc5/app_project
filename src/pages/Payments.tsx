import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPayments } from "@/lib/mockData";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Payments() {
  const [payments] = useState(mockPayments);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getMethodColor = (method: string) => {
    switch (method) {
      case "Mobile Money": return "default";
      case "Cash": return "secondary";
      case "Bank Transfer": return "outline";
      default: return "outline";
    }
  };

  const columns = [
    { header: "Payment ID", accessor: "id" },
    { header: "Borrower", accessor: "borrowerName" },
    { header: "Loan ID", accessor: "loanId" },
    { header: "Date", accessor: "date" },
    { 
      header: "Amount", 
      accessor: "amount",
      cell: (value: number) => <span className="font-semibold text-success">KES {value.toLocaleString()}</span>
    },
    { 
      header: "Method", 
      accessor: "method",
      cell: (value: string) => (
        <Badge variant={getMethodColor(value)}>
          {value}
        </Badge>
      )
    },
    { 
      header: "Notes", 
      accessor: "notes",
      cell: (value?: string) => value ? <span className="text-xs text-muted-foreground">{value}</span> : "-"
    },
  ];

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment recorded successfully!");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground mt-1">Record and track loan repayments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
              <DialogDescription>
                Enter payment details for a loan repayment
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanId">Loan ID *</Label>
                <Input id="loanId" placeholder="L001" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount">Payment Amount (KES) *</Label>
                  <Input id="paymentAmount" type="number" placeholder="10000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Payment Date *</Label>
                  <Input id="paymentDate" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select required>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Additional notes about this payment..." rows={3} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Record Payment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        title={`Payment History (${payments.length})`}
        columns={columns}
        data={payments}
      />
    </div>
  );
}
