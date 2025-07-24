"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { CalendarSelector } from "./CalendarSelector";

interface Props {
  setDateSelected: React.Dispatch<
    React.SetStateAction<{
      from: Date | undefined;
      to: Date | undefined;
    }>
  >;
  showCard?: boolean;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
}

export default function CalendarFilter({
  setDateSelected,
  showCard = false,
  placeholder = "Selecciona un rango de fechas para el análisis",
  maxDate,
  minDate,
}: Props) {
  const content = (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-600">
            Filtro de fechas:
          </span>
        </div>
      </div>
      <CalendarSelector
        setDateSelected={setDateSelected}
        placeholder={placeholder}
        maxDate={maxDate}
        minDate={minDate}
      />
    </div>
  );

  if (showCard) {
    return (
      <Card className="p-4 bg-white/80 backdrop-blur-sm border-white/60 shadow-sm">
        {content}
      </Card>
    );
  }

  return content;
}
