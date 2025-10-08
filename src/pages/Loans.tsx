import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockLoans } from "@/lib/mockData";
import { Plus, Eye } from "lucide-react";
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

export default function Loans() {
  const [loans] = useState(mockLoans);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Completed": return "secondary";
      case "Overdue": return "destructive";
      default: return "outline";
    }
  };

  const columns = [
    { header: "Loan ID", accessor: "id" },
    { header: "Borrower", accessor: "borrowerName" },
    { 
      header: "Amount", 
      accessor: "amount",
      cell: (value: number) => `KES ${value.toLocaleString()}`
    },
    { 
      header: "Interest Rate", 
      accessor: "interestRate",
      cell: (value: number) => `${value}%`
    },
    { header: "Start Date", accessor: "startDate" },
    { header: "Due Date", accessor: "dueDate" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (value: string) => (
        <Badge variant={getStatusVariant(value)}>
          {value}
        </Badge>
      )
    },
    { 
      header: "Remaining", 
      accessor: "remainingBalance",
      cell: (value: number) => <span className="font-semibold">KES {value.toLocaleString()}</span>
    },
  ];

  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Loan created successfully!");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loans</h1>
          <p className="text-muted-foreground mt-1">Track and manage all loan accounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Loan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Loan</DialogTitle>
              <DialogDescription>
                Enter loan details to create a new loan account
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddLoan} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borrower">Borrower Name *</Label>
                <Input id="borrower" placeholder="Select or enter borrower name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount (KES) *</Label>
                  <Input id="amount" type="number" placeholder="50000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest">Interest Rate (%) *</Label>
                  <Input id="interest" type="number" step="0.1" placeholder="12" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input id="startDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input id="dueDate" type="date" required />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Loan</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        title={`All Loans (${loans.length})`}
        columns={columns}
        data={loans}
        actions={(row) => (
          <Button variant="ghost" size="icon" onClick={() => toast.info(`Viewing loan ${row.id}`)}>
            <Eye className="h-4 w-4" />
          </Button>
        )}
      />
    </div>
  );
}
