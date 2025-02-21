import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button"
import { CreateAccountDrawer } from "@/components/CreateAccountDrawer";
import { useNavigate } from 'react-router-dom';

export function AccountCard({ title, balance, type, isDefault, onToggleDefault }) {
  const hasData = title && balance !== undefined && type;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/account/${title}`, { state: { type, balance } });
  };

  return (
    <Card  className="flex items-center justify-center h-32 cursor-pointer">
      {hasData ? (
        <CardHeader>
          <div  className="flex items-center justify-between">
            <div onClick={handleClick} >
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">{type}</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm ml-8">Default</span>
              <Switch checked={isDefault} onCheckedChange={onToggleDefault} />
            </div>
          </div>
        </CardHeader>
      ) : (
        <CardContent className="flex flex-col items-center justify-center h-full">
          <CreateAccountDrawer/>
          <span className="text-sm">Add Account</span>
        </CardContent>
      )}
    </Card>
  );
}
