import { Controller, type Control } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getMateriaPrimas } from "@/modules/material/actions/get-materials.actions";
import { useState } from "react";
import type { RegistroCostosFormValues } from "../schemas";

interface CostFormProps {
  control: Control<RegistroCostosFormValues>;
}

export default function CostForm({ control }: CostFormProps) {
  const { data = [] } = useQuery({
    queryKey: ["getMateriaPrimas"],
    queryFn: getMateriaPrimas,
  });

  const [open, setOpen] = useState(false);

  const options = data.map((item: any) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  return (
    <div className="space-y-3 mb-5">
      <label htmlFor="productoId" className="font-medium">
        Producto
      </label>
      <Controller
        name="productoId"
        control={control}
        render={({ field }) => {
          const selectedLabel =
            options.find((opt) => opt.value === field.value)?.label ||
            "Selecciona una opción";

          return (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                className="w-full inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
                onClick={() => setOpen(!open)}
              >
                {selectedLabel}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar producto..." />
                  <CommandList>
                    <CommandEmpty>No se encontró</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          onSelect={() => {
                            field.onChange(opt.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === opt.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {opt.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}
