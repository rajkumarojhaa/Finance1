import React, { useState, useEffect } from "react"
import { MonthlyBudget } from "@/components/MonthlyBudget"
import { TransactionList } from "@/components/TransactionList"
import { ExpenseBreakdown } from "@/components/ExpenseBreakdown"
import { AccountCard } from "@/components/AccountCard"

export default function Dashboard() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Work", balance: 5941.0, type: "Current Account", isDefault: true },
    { id: 2, name: "Personal", balance: 15124.4, type: "Savings Account", isDefault: false },
  ])

  const [transactions, setTransactions] = useState([
    { id: 1, name: "Flat Rent (Recurring)", date: "Dec 12, 2024", amount: -3500.0 },
    { id: 2, name: "Netflix (Recurring)", date: "Dec 8, 2024", amount: -10.0 },
    { id: 3, name: "Received salary", date: "Dec 5, 2024", amount: 5649.52 },
    { id: 4, name: "Paid for shopping", date: "Dec 5, 2024", amount: -157.21 },
    { id: 5, name: "Paid for shopping", date: "Dec 4, 2024", amount: -418.58 },
  ])

  const [expenseData, setExpenseData] = useState([
    { name: "rental", value: 3500.0, color: "#ff6b6b" },
    { name: "entertainment", value: 304.23, color: "#4ecdc4" },
    { name: "shopping", value: 1181.13, color: "#45b7d1" },
    { name: "travel", value: 1251.66, color: "#96ceb4" },
  ])

  const [defaultAccount, setDefaultAccount] = useState(null)
  

  useEffect(() => {
    const newDefaultAccount = accounts.find((account) => account.isDefault) || accounts[0]
    setDefaultAccount(newDefaultAccount)
  }, [accounts])

  const handleToggleDefault = (id) => {
    setAccounts(
      accounts.map((account) => ({
        ...account,
        isDefault: account.id === id,
      })),
    )
  }

  const handleAddAccount = (accountName, initialBalance) => {
    const newAccount = {
      id: accounts.length + 1,
      name: accountName,
      balance: initialBalance,
      type: "New Account",
      isDefault: false,
    }
    setAccounts([...accounts, newAccount])
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <main className="w-full">
        <h1 className="text-3xl font-bold text-[#5850EC] mb-6">Dashboard</h1>

        {/* Grid Container */}
        <div className="grid gap-4">
          {defaultAccount && (
            <MonthlyBudget used={4775} total={7000} accountName={defaultAccount.name} />
          )}

          {/* Transactions & Expense Breakdown */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <TransactionList transactions={transactions} />
            <ExpenseBreakdown expenseData={expenseData} />
          </div>

          {/* Account Cards */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                title={account.name}
                balance={account.balance}
                type={account.type}
                isDefault={account.isDefault}
                onToggleDefault={() => handleToggleDefault(account.id)}
              />
            ))}
            <AccountCard/>
          </div>
        </div>
      </main>
    </div>
  )
}

