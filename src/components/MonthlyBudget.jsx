import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export function MonthlyBudget({ used, total, accountName }) {
  const [editableTotal, setEditableTotal] = useState(total);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(editableTotal);
  const percentage = Math.round((used / editableTotal) * 100);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setEditableTotal(Number(inputValue) || editableTotal);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Monthly Budget ({accountName})
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            ${used.toFixed(2)} of ${editableTotal.toFixed(2)} used
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">{percentage}% used</span>
          <div className="flex items-center space-x-1">
            {isEditing ? (
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-16 text-xs border rounded px-1 py-0.5 text-right bg-white dark:bg-gray-800"
                autoFocus
              />
            ) : (
              <button onClick={handleEditClick} className="text-gray-500 hover:text-blue-600">
                <Pencil size={14} />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
