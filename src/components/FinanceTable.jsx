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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    id: 1,
    date: "2024-02-20",
    description: "Groceries",
    category: "Food",
    amount: -50,
    recurring: "No",
  },
  {
    id: 2,
    date: "2024-02-21",
    description: "Salary",
    category: "Income",
    amount: 3000,
    recurring: "Yes",
  },
  {
    id: 3,
    date: "2024-02-22",
    description: "Gym Membership",
    category: "Fitness",
    amount: -30,
    recurring: "Yes",
  },
  {
    id: 4,
    date: "2024-02-23",
    description: "Internet",
    category: "Utilities",
    amount: -60,
    recurring: "No",
  },
];

const categories = ["All", "Food", "Housing", "Fitness", "Utilities", "Income"];

const categoryColors = {
  Food: "bg-red-200 text-red-700",
  Housing: "bg-blue-200 text-blue-700",
  Fitness: "bg-green-200 text-green-700",
  Utilities: "bg-purple-200 text-purple-700",
  Income: "bg-yellow-200 text-yellow-700",
};

export default function FinanceTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredData = data.filter(
    (item) =>
      (filter === "All" || item.category === filter) &&
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Card className=" pt-5 dark:bg-gray-900">
      <CardContent>
        {/* Search and Filter */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3"
          />
          <Select onValueChange={(value) => setFilter(value)} defaultValue="All">
            <SelectTrigger className="w-1/4">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
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
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md ${
                          categoryColors[item.category] || "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className={item.amount > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {item.amount > 0 ? `+${item.amount}` : item.amount}
                    </TableCell>
                    <TableCell>{item.recurring}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
