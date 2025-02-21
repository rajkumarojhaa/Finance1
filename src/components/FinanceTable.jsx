import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

const initialData = [
  { id: 1, date: "2024-02-20", description: "Groceries", category: "Food", amount: -50, recurring: "No" },
  { id: 2, date: "2024-02-21", description: "Salary", category: "Income", amount: 3000, recurring: "Yes" },
  { id: 3, date: "2024-02-22", description: "Gym Membership", category: "Fitness", amount: -30, recurring: "Yes" },
  { id: 4, date: "2024-02-23", description: "Internet", category: "Utilities", amount: -60, recurring: "No" },
];

const categories = ["All", "Income", "Expense"];
const transactionTypes = ["All Transactions", "Recurring Only", "Non-recurring Only"];

export default function FinanceTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [transactionFilter, setTransactionFilter] = useState("All Transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const itemsPerPage = 3;

  const filteredData = data.filter((item) => {
    if (filter !== "All") {
      if (filter === "Income" && item.amount <= 0) return false;
      if (filter === "Expense" && item.amount >= 0) return false;
    }
    if (transactionFilter !== "All Transactions") {
      if (transactionFilter === "Recurring Only" && item.recurring !== "Yes") return false;
      if (transactionFilter === "Non-recurring Only" && item.recurring !== "No") return false;
    }
    return true;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleSelect = (id) => {
    setSelectedTransactions((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setData((prev) => prev.filter((item) => !selectedTransactions.includes(item.id)));
    setSelectedTransactions([]);
  };

  const clearFilters = () => {
    setFilter("All");
    setTransactionFilter("All Transactions");
    setSearch("");
  };

  return (
    <Card className="pt-5 bg-slate-50 dark:bg-gray-900 shadow-xl rounded-lg">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-1/3 w-1/4" />
          <Select onValueChange={(value) => setFilter(value)} defaultValue="All">
            <SelectTrigger className="w-1/4"><SelectValue placeholder="Filter by category" /></SelectTrigger>
            <SelectContent>{categories.map((category) => (<SelectItem key={category} value={category}>{category}</SelectItem>))}</SelectContent>
          </Select>
          <Select onValueChange={(value) => setTransactionFilter(value)} defaultValue="All Transactions">
            <SelectTrigger className="w-1/4"><SelectValue placeholder="Filter by type" /></SelectTrigger>
            <SelectContent>{transactionTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}</SelectContent>
          </Select>
          {selectedTransactions.length > 0 ? (
            <Button variant="destructive" className="ml-2" onClick={deleteSelected}>Delete</Button>
          ) : (
            (filter !== "All" || transactionFilter !== "All Transactions" || search !== "") && (
              <Button variant="outline" onClick={clearFilters}>Clear</Button>
            )
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Checkbox onCheckedChange={(checked) => setSelectedTransactions(checked ? data.map(d => d.id) : [])} /></TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount ($)</TableHead>
                <TableHead>Recurring</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><Checkbox checked={selectedTransactions.includes(item.id)} onCheckedChange={() => toggleSelect(item.id)} /></TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className={item.amount > 0 ? "text-green-500" : "text-red-500"}>{item.amount > 0 ? `+${item.amount}` : item.amount}</TableCell>
                    <TableCell>{item.recurring}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No results found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
}
