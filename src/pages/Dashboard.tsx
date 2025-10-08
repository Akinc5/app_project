import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMetrics, mockLoans } from "@/lib/mockData";
import { Users, Banknote, TrendingUp, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const COLORS = {
  active: "hsl(var(--success))",
  completed: "hsl(var(--primary))",
  overdue: "hsl(var(--destructive))",
};

export default function Dashboard() {
  const loanStatusData = [
    { name: "Active", value: mockLoans.filter(l => l.status === "Active").length },
    { name: "Completed", value: mockLoans.filter(l => l.status === "Completed").length },
    { name: "Overdue", value: mockLoans.filter(l => l.status === "Overdue").length },
  ];

  const monthlyData = [
    { month: "Jan", amount: 25000 },
    { month: "Feb", amount: 32000 },
    { month: "Mar", amount: 28000 },
    { month: "Apr", amount: 35000 },
    { month: "May", amount: 30000 },
    { month: "Jun", amount: 42000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your microfinance operations</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Borrowers"
          value={mockMetrics.totalBorrowers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          variant="default"
        />
        <MetricCard
          title="Active Loans"
          value={mockMetrics.activeLoans}
          icon={Banknote}
          variant="success"
        />
        <MetricCard
          title="Total Outstanding"
          value={`KES ${mockMetrics.totalOutstanding.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 8, isPositive: false }}
          variant="warning"
        />
        <MetricCard
          title="Repayment Rate"
          value={`${mockMetrics.repaymentRate}%`}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          variant="success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Distribution by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Collections Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Repayment Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Disbursed</p>
            <p className="text-2xl font-bold text-primary mt-2">
              KES {mockMetrics.totalDisbursed.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Recovered</p>
            <p className="text-2xl font-bold text-success mt-2">
              KES {mockMetrics.totalRecovered.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Overdue Loans</p>
            <p className="text-2xl font-bold text-destructive mt-2">
              {mockMetrics.overdueLoans}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Interest Earned</p>
            <p className="text-2xl font-bold text-accent mt-2">
              KES {mockMetrics.interestEarned.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
