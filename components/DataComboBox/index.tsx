"use client";
import { cn } from "@/utils/cn";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

const DataComboBox = ({
  setComponet,
  values = [],
  setSelect,
  placeholder,
  isError,
  disabled,
  noIcon,
}: {
  setComponet: any;
  values: any;
  setSelect?: (value: any) => void;
  placeholder?: string;
  isError?: boolean;
  disabled?: boolean;
  noIcon?: boolean;
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<any>({});

  const filteredPeople =
    query === ""
      ? values
      : values?.filter((person: any) => {
          return person?.name?.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (selected) {
      setSelect?.(selected);
    }
  }, [selected]);

  return (
    <div className="">
      <Combobox
        value={selected}
        onChange={(value: any) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={cn(
              "main-input capitalize",
              isError && "border-red-500",
              !noIcon && "pl-10",
              noIcon && "rounded-full"
            )}
            displayValue={(person: any) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
          <ComboboxButton className="group absolute inset-y-0 right-3">
            <FiPlus className="text-xl text-gray-600" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-gray-300 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 mt-3 shadow-md z-50"
          )}
        >
          <div className="max-h-[400px] overflow-auto custom_scroll flex flex-col gap-5 ">
            {filteredPeople.map((person: any) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group cursor-default rounded-lg px-3 select-none"
              >
                {setComponet(person)}
              </ComboboxOption>
            ))}
          </div>
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

export default DataComboBox;
