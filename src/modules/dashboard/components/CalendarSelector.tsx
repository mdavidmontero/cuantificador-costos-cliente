"use client";

import type * as React from "react";
import { CalendarIcon, X, RotateCcw } from "lucide-react";
import {
  format,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CalendarSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  setDateSelected: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>
  >;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
};

// Presets de fechas comunes
const datePresets = [
  {
    label: "Últimos 7 días",
    getValue: () => ({
      from: subDays(new Date(), 6),
      to: new Date(),
    }),
  },
  {
    label: "Últimos 30 días",
    getValue: () => ({
      from: subDays(new Date(), 29),
      to: new Date(),
    }),
  },
  {
    label: "Este mes",
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: "Esta semana",
    getValue: () => ({
      from: startOfWeek(new Date(), { locale: es }),
      to: endOfWeek(new Date(), { locale: es }),
    }),
  },
];

export function CalendarSelector({
  setDateSelected,
  placeholder = "Selecciona un rango de fechas",
  maxDate,
  minDate,
  className,
  ...props
}: CalendarSelectorProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setDateSelected({
      from: date?.from,
      to: date?.to,
    });
  }, [date, setDateSelected]);

  const handlePresetSelect = (preset: (typeof datePresets)[0]) => {
    const newDate = preset.getValue();
    setDate(newDate);
    setIsOpen(false);
  };

  const handleReset = () => {
    const defaultRange = {
      from: subDays(new Date(), 6),
      to: new Date(),
    };
    setDate(defaultRange);
  };

  const handleClear = () => {
    setDate(undefined);
  };

  const formatDateRange = () => {
    if (!date?.from) return placeholder;

    if (date.to) {
      return `${format(date.from, "dd MMM", { locale: es })} - ${format(
        date.to,
        "dd MMM, yyyy",
        { locale: es }
      )}`;
    }

    return format(date.from, "dd MMM, yyyy", { locale: es });
  };

  const getDaysCount = () => {
    if (!date?.from || !date?.to) return 0;
    const diffTime = Math.abs(date.to.getTime() - date.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal bg-white/80 backdrop-blur-sm border-white/60 hover:bg-white/90 transition-all duration-200 shadow-sm min-w-[280px]",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
            <span className="truncate">{formatDateRange()}</span>
            {date?.from && date?.to && (
              <Badge
                variant="secondary"
                className="ml-auto bg-blue-100 text-blue-700 text-xs"
              >
                {getDaysCount()} días
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 bg-white/95 backdrop-blur-sm border-white/60 shadow-xl"
          align="start"
          sideOffset={4}
        >
          <div className="flex">
            {/* Presets Sidebar */}
            <div className="w-48 p-4 border-r border-gray-100 bg-gray-50/50">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Rangos rápidos
                </h4>
                {datePresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    onClick={() => handlePresetSelect(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}

                <Separator className="my-3" />

                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm hover:bg-orange-50 hover:text-orange-700 transition-colors"
                    onClick={handleReset}
                  >
                    <RotateCcw className="w-3 h-3 mr-2" />
                    Restablecer
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm hover:bg-red-50 hover:text-red-700 transition-colors"
                    onClick={handleClear}
                  >
                    <X className="w-3 h-3 mr-2" />
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="p-4">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="rounded-lg border-0"
                locale={es}
                disabled={(date) => {
                  if (maxDate && date > maxDate) return true;
                  if (minDate && date < minDate) return true;
                  return false;
                }}
                classNames={{
                  day_selected:
                    "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-semibold",
                  day_today:
                    "bg-blue-100 text-blue-900 font-semibold border border-blue-300",
                  day_range_middle:
                    "bg-blue-50 text-blue-900 hover:bg-blue-100",
                  day_range_start:
                    "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-l-md",
                  day_range_end:
                    "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-md",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-300 opacity-30 cursor-not-allowed",
                  day_hidden: "invisible",
                  nav_button:
                    "hover:bg-blue-50 hover:text-blue-700 transition-colors",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  caption:
                    "flex justify-center pt-1 relative items-center text-gray-900 font-semibold",
                  caption_label: "text-sm font-medium",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell:
                    "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 hover:text-blue-900 transition-colors rounded-md",
                }}
              />

              {/* Footer with selected range info */}
              {date?.from && date?.to && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Rango seleccionado:
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {getDaysCount()} días
                    </Badge>
                  </div>
                  <p className="text-blue-700 font-semibold mt-1">
                    {formatDateRange()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Quick actions */}
      {date?.from && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-700 transition-colors"
            onClick={handleReset}
            title="Restablecer fechas"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-700 transition-colors"
            onClick={handleClear}
            title="Limpiar selección"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
