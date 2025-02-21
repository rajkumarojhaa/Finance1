import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

export default function AddTransaction() {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("Personal");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = () => {
    console.log({
      type,
      amount,
      account,
      category,
      date,
      description,
      recurring,
    });
  };

  return (
    <div className="max-w-4xl  mx-auto ">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-center py-3">
        Add Transaction
      </h1>
      <Card className="mt-4 sm:p-9 p-6 shadow-xl rounded-lg">
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setType} defaultValue={type}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Expense">Expense</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Select onValueChange={setAccount} defaultValue={account}>
              <SelectTrigger>
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex items-center space-x-2">
              <Switch checked={recurring} onCheckedChange={setRecurring} />
              <span>Recurring Transaction</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="w-full sm:w-auto">
                Add Transaction
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
