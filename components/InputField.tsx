import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // const name = label.toLowerCase();

  const error = errors[name]?.message;
  // const isDirty = dirtyFields && dirtyFields[name];
  // const showError =  error;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        {...register(name)}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        type={type}
        placeholder={`Enter ${label}`}
      />
      {error && (
        <p className="text-red-500 text-xs italic">{error.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
