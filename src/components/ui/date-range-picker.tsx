"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRange {
  from: string;
  to: string;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  className,
  disabled = false,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempFromDate, setTempFromDate] = React.useState<Date | undefined>(
    value?.from ? new Date(value.from) : undefined
  );
  const [tempToDate, setTempToDate] = React.useState<Date | undefined>(
    value?.to ? new Date(value.to) : undefined
  );

  const formatDisplayValue = () => {
    if (!value?.from && !value?.to) return placeholder;
    if (value?.from && value?.to) {
      return `${value.from} - ${value.to}`;
    }
    if (value?.from) return `From: ${value.from}`;
    if (value?.to) return `To: ${value.to}`;
    return placeholder;
  };

  const handleApply = () => {
    const newRange = {
      from: tempFromDate ? tempFromDate.toISOString().split("T")[0] : "",
      to: tempToDate ? tempToDate.toISOString().split("T")[0] : "",
    };
    onChange?.(newRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempFromDate(undefined);
    setTempToDate(undefined);
    onChange?.({ from: "", to: "" });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between font-normal font-outfit  px-4 py-5 border border-zinc-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all duration-200",
            className
          )}
          disabled={disabled}
        >
          {formatDisplayValue()}
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Select Date Range
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                From Date
              </label>
              <Calendar
                mode="single"
                selected={tempFromDate}
                onSelect={setTempFromDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                To Date
              </label>
              <Calendar
                mode="single"
                selected={tempToDate}
                onSelect={setTempToDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <button
              onClick={handleClear}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              Apply
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
