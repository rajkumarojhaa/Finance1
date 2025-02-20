import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { subDays, subMonths, isAfter } from "date-fns";
import FinanceTable from "./FinanceTable";

const AccountDetails = () => {
  const { title } = useParams();
  const location = useLocation();
  const { type, balance } = location.state || { type: "Unknown" };
  const [filter, setFilter] = useState("all");

  // Mock data for demonstration purposes
  const accountData = {
    name: title,
    type: type,
    totalAmount: balance,
    transactions: [
      { date: new Date(2023, 0, 1), amount: 500, type: "income" },
      { date: new Date(2023, 1, 1), amount: 700, type: "income" },
      { date: new Date(2023, 2, 1), amount: 800, type: "expense" },
      { date: new Date(2023, 3, 1), amount: 600, type: "income" },
      { date: new Date(2023, 4, 1), amount: 900, type: "expense" },
      { date: new Date(2023, 5, 1), amount: 400, type: "income" },
      { date: new Date(2023, 0, 15), amount: 300, type: "expense" },
      { date: new Date(2023, 1, 15), amount: 200, type: "expense" },
    ],
  };

  const applyFilter = (transactions, filter) => {
    const now = new Date();
    let filteredTransactions = transactions;

    switch (filter) {
      case "7days":
        filteredTransactions = transactions.filter((transaction) =>
          isAfter(transaction.date, subDays(now, 7))
        );
        break;
      case "1month":
        filteredTransactions = transactions.filter((transaction) =>
          isAfter(transaction.date, subMonths(now, 1))
        );
        break;
      case "3months":
        filteredTransactions = transactions.filter((transaction) =>
          isAfter(transaction.date, subMonths(now, 3))
        );
        break;
      case "6months":
        filteredTransactions = transactions.filter((transaction) =>
          isAfter(transaction.date, subMonths(now, 6))
        );
        break;
      default:
        break;
    }

    return filteredTransactions;
  };

  const filteredTransactions = applyFilter(accountData.transactions, filter);

  const totalIncome = filteredTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  // Group transactions by month
  const groupedData = filteredTransactions.reduce((acc, transaction) => {
    const month = transaction.date.toLocaleString("default", { month: "long" });
    if (!acc[month]) {
      acc[month] = { month, income: 0, expense: 0 };
    }
    if (transaction.type === "income") {
      acc[month].income += transaction.amount;
    } else {
      acc[month].expense += transaction.amount;
    }
    return acc;
  }, {});

  const data = Object.values(groupedData);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const truncateValue = (value) => {
    const valueStr = value.toString();
    return valueStr.length > 10 ? `${valueStr.slice(0, 10)}...` : valueStr;
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-900">
      {/* Header Section */}
      <header className="mb-4 flex sm:text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
            {accountData.name}
          </h1>
          <p className="text-xs sm:text-sm">{accountData.type}</p>
        </div>
        <span className="ml-auto text-right p-2">
          <h1 className="text-sm font-extrabold sm:font-bold sm:text-base">
            ${accountData.totalAmount}
          </h1>
        </span>
      </header>

      {/* Two-Card Layout */}
      <div className="grid grid-cols-1 gap-4">
        {/* Transaction Overview Card */}
        <div className="card bg-slate-50 dark:bg-gray-800 shadow-xl rounded-lg  w-full">
          <div className="card-header flex flex-col sm:flex-row justify-between items-center gap-2">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border rounded p-2 text-gray-900 dark:white dark:bg-gray-100 text-sm sm:text-base w-full sm:w-auto"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
            </select>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:text-left text-wrap">
            <p className="text-sm sm:text-base font-medium">
              Total Income: <span className="text-green-500">${truncateValue(totalIncome)}</span>
            </p>
            <p className="text-sm sm:text-base font-medium">
              Total Expenses: <span className="text-red-500">${truncateValue(totalExpenses)}</span>
            </p>
            <p className="text-sm sm:text-base font-medium">
              Net Amount: <span className="text-blue-500" title={netAmount.toString()}>{truncateValue(netAmount)}</span>
            </p>
          </div>
          <div className="sm:mt-6 mt-2 overflow-x-auto w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" name="Income" />
                <Bar dataKey="expense" fill="#ff4d4d" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Finance Table Card */}
        <div className="card ">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">Transaction Details</h2>
          <FinanceTable />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
