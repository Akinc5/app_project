import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBorrowers } from "@/lib/mockData";
import { Plus, Eye, Edit } from "lucide-react";
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

export default function Borrowers() {
  const [borrowers] = useState(mockBorrowers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { 
      header: "Gender", 
      accessor: "gender",
      cell: (value: string) => <span className="text-muted-foreground">{value}</span>
    },
    { header: "Contact", accessor: "contact" },
    { header: "Loan Group", accessor: "loanGroup" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (value: string) => (
        <Badge variant={value === "Active" ? "default" : "secondary"}>
          {value}
        </Badge>
      )
    },
  ];

  const handleAddBorrower = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Borrower added successfully!");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Borrowers</h1>
          <p className="text-muted-foreground mt-1">Manage borrower profiles and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Borrower
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Borrower</DialogTitle>
              <DialogDescription>
                Enter the borrower's information to create a new profile
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBorrower} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select required>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input id="contact" type="tel" placeholder="+254 712 345 678" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input id="email" type="email" placeholder="john@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanGroup">Loan Group *</Label>
                <Input id="loanGroup" placeholder="Women Empowerment Group" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" placeholder="Kibera, Nairobi" required />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Borrower</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        title={`All Borrowers (${borrowers.length})`}
        columns={columns}
        data={borrowers}
        actions={(row) => (
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="icon" onClick={() => toast.info(`Viewing ${row.name}`)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast.info(`Editing ${row.name}`)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
