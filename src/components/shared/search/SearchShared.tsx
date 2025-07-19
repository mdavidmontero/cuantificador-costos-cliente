import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SearchSelectFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  label?: string;
}

export default function SearchSelectForm<T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Selecciona una opción",
  label,
}: SearchSelectFormProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      {label && <label className="font-medium text-sm">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedLabel =
            options.find((opt) => opt.value === field.value)?.label ||
            placeholder;

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
                  <CommandInput placeholder="Buscar..." />
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
