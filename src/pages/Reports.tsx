import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockMetrics, mockLoans, mockBorrowers, mockPayments } from "@/lib/mockData";
import { Download, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Reports() {
  const handleGenerateReport = (type: string) => {
    toast.success(`Generating ${type} report...`);
  };

  const reportSections = [
    {
      title: "Portfolio Summary",
      data: [
        { label: "Total Borrowers", value: mockBorrowers.length },
        { label: "Active Loans", value: mockLoans.filter(l => l.status === "Active").length },
        { label: "Completed Loans", value: mockLoans.filter(l => l.status === "Completed").length },
        { label: "Overdue Loans", value: mockLoans.filter(l => l.status === "Overdue").length },
      ]
    },
    {
      title: "Financial Summary",
      data: [
        { label: "Total Disbursed", value: `KES ${mockMetrics.totalDisbursed.toLocaleString()}` },
        { label: "Total Recovered", value: `KES ${mockMetrics.totalRecovered.toLocaleString()}` },
        { label: "Outstanding Balance", value: `KES ${mockMetrics.totalOutstanding.toLocaleString()}` },
        { label: "Interest Earned", value: `KES ${mockMetrics.interestEarned.toLocaleString()}` },
      ]
    },
    {
      title: "Performance Metrics",
      data: [
        { label: "Repayment Rate", value: `${mockMetrics.repaymentRate}%` },
        { label: "Portfolio at Risk", value: "18.2%" },
        { label: "Average Loan Size", value: `KES ${(mockMetrics.totalDisbursed / mockLoans.length).toLocaleString()}` },
        { label: "Total Payments", value: mockPayments.length },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and export summary reports</p>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" defaultValue="2024-01-01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" defaultValue="2024-12-31" />
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2" onClick={() => handleGenerateReport("Custom Period")}>
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportSections.map((section, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.data.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => handleGenerateReport("Monthly Summary")}
            >
              <Calendar className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-semibold">Monthly Summary</p>
                <p className="text-xs text-muted-foreground">Current month overview</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => handleGenerateReport("Overdue Loans")}
            >
              <FileText className="h-5 w-5 text-destructive" />
              <div className="text-left">
                <p className="font-semibold">Overdue Loans</p>
                <p className="text-xs text-muted-foreground">All overdue accounts</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => handleGenerateReport("Borrower List")}
            >
              <Download className="h-5 w-5 text-accent" />
              <div className="text-left">
                <p className="font-semibold">Borrower List</p>
                <p className="text-xs text-muted-foreground">All borrowers</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => handleGenerateReport("Payment History")}
            >
              <Download className="h-5 w-5 text-success" />
              <div className="text-left">
                <p className="font-semibold">Payment History</p>
                <p className="text-xs text-muted-foreground">All transactions</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => toast.success("Exporting to PDF...")}>
              <Download className="h-4 w-4 mr-2" />
              Export to PDF
            </Button>
            <Button variant="outline" onClick={() => toast.success("Exporting to Excel...")}>
              <Download className="h-4 w-4 mr-2" />
              Export to Excel
            </Button>
            <Button variant="outline" onClick={() => toast.success("Exporting to CSV...")}>
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
