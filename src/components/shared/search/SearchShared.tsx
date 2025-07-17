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
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

type FormData = {
  theme: string;
};

export default function ThemeForm() {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      theme: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Selected theme:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[300px]">
      <Controller
        name="theme"
        control={control}
        render={({ field }) => {
          const selectedLabel =
            themes.find((t) => t.value === field.value)?.label ||
            "Select theme";

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
                  <CommandInput placeholder="Search theme..." />
                  <CommandList>
                    <CommandEmpty>No theme found.</CommandEmpty>
                    <CommandGroup>
                      {themes.map((theme) => (
                        <CommandItem
                          key={theme.value}
                          onSelect={() => {
                            field.onChange(theme.value);
                            setOpen(false); // 🔐 Cerramos el Popover
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === theme.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {theme.label}
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

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar tema
      </button>
    </form>
  );
}
