import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  register: any;
  error?: string | undefined;
  onBlur?: () => void;
  dirtyFields?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  register,
  error,
  onBlur,
  dirtyFields,
}) => {
  const isDirty = dirtyFields && dirtyFields[name];
  const showError = isDirty && error;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          showError ? "border-red-500" : "border-gray-300"
        }`}
        name={name}
        type={type}
        placeholder={`Enter ${label}`}
        {...register}
        onBlur={onBlur}
      />
      {showError && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default InputField;
