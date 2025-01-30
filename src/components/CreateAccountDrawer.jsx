import React, { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react"

export function CreateAccountDrawer() {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const handleCreate = () => {
    console.log({
      accountName,
      accountType,
      initialBalance,
      isDefault,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">
        <Plus className="w-8 h-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
          <DrawerDescription>Fill in the details to create a new account.</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4">
          <div>
            <Label>Account Name</Label>
            <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Enter account name" />
          </div>
          <div>
            <Label>Account Type</Label>
            <Select onValueChange={setAccountType}>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Initial Balance</Label>
            <Input type="number" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} placeholder="Enter initial balance" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Set as Default</Label>
            <Switch checked={isDefault} onCheckedChange={setIsDefault} />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
