import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label: string;
  name: string;
}

const DateInput: React.FC<DateInputProps> = ({ label, name }) => {
  const { control, formState } = useFormContext();

  const { errors, dirtyFields } = formState;

  const nameLowerCase = name.toLowerCase();
  const error = errors[nameLowerCase]?.message;
  const isDirty = dirtyFields && dirtyFields[nameLowerCase];
  const showError = isDirty && error;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <DatePicker
              selected={field.value || null}
              onChange={(date: Date) => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText={`Select ${label}`}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                showError ? "border-red-500" : "border-gray-300"
              }`}
              onKeyDown={(e) => e.preventDefault()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              onBlur={field.onBlur}
            />
            {showError && (
              <p className="text-red-500 text-xs italic">{String(error)}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default DateInput;
