export interface Borrower {
  id: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  contact: string;
  email?: string;
  loanGroup: string;
  address: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

export interface Loan {
  id: string;
  borrowerId: string;
  borrowerName: string;
  amount: number;
  interestRate: number;
  startDate: string;
  dueDate: string;
  status: "Active" | "Completed" | "Overdue";
  paidAmount: number;
  remainingBalance: number;
  totalInterest: number;
}

export interface Payment {
  id: string;
  loanId: string;
  borrowerId: string;
  borrowerName: string;
  date: string;
  amount: number;
  method: "Cash" | "Bank Transfer" | "Mobile Money" | "Check";
  notes?: string;
}

export interface DashboardMetrics {
  totalBorrowers: number;
  activeLoans: number;
  totalOutstanding: number;
  repaymentRate: number;
  totalDisbursed: number;
  totalRecovered: number;
  overdueLoans: number;
  interestEarned: number;
}
