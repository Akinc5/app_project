import { Borrower, Loan, Payment, DashboardMetrics } from "@/types";

export const mockBorrowers: Borrower[] = [
  {
    id: "B001",
    name: "Grace Achieng",
    gender: "Female",
    contact: "+254 712 345 678",
    email: "grace.a@email.com",
    loanGroup: "Women Empowerment Group",
    address: "Kibera, Nairobi",
    joinDate: "2023-01-15",
    status: "Active"
  },
  {
    id: "B002",
    name: "John Kamau",
    gender: "Male",
    contact: "+254 723 456 789",
    email: "john.k@email.com",
    loanGroup: "Small Business Group",
    address: "Kawangware, Nairobi",
    joinDate: "2023-02-20",
    status: "Active"
  },
  {
    id: "B003",
    name: "Mary Wanjiku",
    gender: "Female",
    contact: "+254 734 567 890",
    loanGroup: "Women Empowerment Group",
    address: "Mathare, Nairobi",
    joinDate: "2023-03-10",
    status: "Active"
  },
  {
    id: "B004",
    name: "David Omondi",
    gender: "Male",
    contact: "+254 745 678 901",
    email: "david.o@email.com",
    loanGroup: "Agricultural Group",
    address: "Kisumu West",
    joinDate: "2023-04-05",
    status: "Active"
  },
  {
    id: "B005",
    name: "Sarah Muthoni",
    gender: "Female",
    contact: "+254 756 789 012",
    loanGroup: "Retail Traders Group",
    address: "Gikomba, Nairobi",
    joinDate: "2023-05-12",
    status: "Active"
  }
];

export const mockLoans: Loan[] = [
  {
    id: "L001",
    borrowerId: "B001",
    borrowerName: "Grace Achieng",
    amount: 50000,
    interestRate: 12,
    startDate: "2024-01-01",
    dueDate: "2024-12-31",
    status: "Active",
    paidAmount: 30000,
    remainingBalance: 26000,
    totalInterest: 6000
  },
  {
    id: "L002",
    borrowerId: "B002",
    borrowerName: "John Kamau",
    amount: 75000,
    interestRate: 10,
    startDate: "2024-02-01",
    dueDate: "2025-02-01",
    status: "Active",
    paidAmount: 15000,
    remainingBalance: 67500,
    totalInterest: 7500
  },
  {
    id: "L003",
    borrowerId: "B003",
    borrowerName: "Mary Wanjiku",
    amount: 30000,
    interestRate: 15,
    startDate: "2023-09-01",
    dueDate: "2024-09-01",
    status: "Completed",
    paidAmount: 34500,
    remainingBalance: 0,
    totalInterest: 4500
  },
  {
    id: "L004",
    borrowerId: "B004",
    borrowerName: "David Omondi",
    amount: 100000,
    interestRate: 8,
    startDate: "2024-03-01",
    dueDate: "2024-11-30",
    status: "Overdue",
    paidAmount: 20000,
    remainingBalance: 88000,
    totalInterest: 8000
  },
  {
    id: "L005",
    borrowerId: "B005",
    borrowerName: "Sarah Muthoni",
    amount: 40000,
    interestRate: 12,
    startDate: "2024-06-01",
    dueDate: "2025-06-01",
    status: "Active",
    paidAmount: 8000,
    remainingBalance: 36800,
    totalInterest: 4800
  }
];

export const mockPayments: Payment[] = [
  {
    id: "P001",
    loanId: "L001",
    borrowerId: "B001",
    borrowerName: "Grace Achieng",
    date: "2024-03-15",
    amount: 10000,
    method: "Mobile Money"
  },
  {
    id: "P002",
    loanId: "L001",
    borrowerId: "B001",
    borrowerName: "Grace Achieng",
    date: "2024-06-15",
    amount: 10000,
    method: "Mobile Money"
  },
  {
    id: "P003",
    loanId: "L001",
    borrowerId: "B001",
    borrowerName: "Grace Achieng",
    date: "2024-09-15",
    amount: 10000,
    method: "Cash"
  },
  {
    id: "P004",
    loanId: "L002",
    borrowerId: "B002",
    borrowerName: "John Kamau",
    date: "2024-05-01",
    amount: 15000,
    method: "Bank Transfer"
  },
  {
    id: "P005",
    loanId: "L003",
    borrowerId: "B003",
    borrowerName: "Mary Wanjiku",
    date: "2024-08-30",
    amount: 34500,
    method: "Mobile Money",
    notes: "Final payment - Loan completed"
  },
  {
    id: "P006",
    loanId: "L004",
    borrowerId: "B004",
    borrowerName: "David Omondi",
    date: "2024-04-15",
    amount: 20000,
    method: "Cash"
  },
  {
    id: "P007",
    loanId: "L005",
    borrowerId: "B005",
    borrowerName: "Sarah Muthoni",
    date: "2024-08-01",
    amount: 8000,
    method: "Mobile Money"
  }
];

export const mockMetrics: DashboardMetrics = {
  totalBorrowers: 5,
  activeLoans: 3,
  totalOutstanding: 218300,
  repaymentRate: 67.5,
  totalDisbursed: 295000,
  totalRecovered: 127500,
  overdueLoans: 1,
  interestEarned: 30800
};
