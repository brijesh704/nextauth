import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  label: string;
  name: string;
  control: any;
  error?: string | undefined;
  dobError?: string | undefined;
  onBlur?: () => void;
  dirtyFields?: any;
  touched?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  control,
  error,
  dobError,
  onBlur,
  dirtyFields,
  touched,
}) => {
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
                error || dobError || (touched && !field.value)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onKeyDown={(e) => e.preventDefault()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              onBlur={onBlur}
            />
            {dobError && (
              <p className="text-red-500 text-xs italic">{dobError}</p>
            )}
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
        )}
      />
    </div>
  );
};

export default DateInput;
