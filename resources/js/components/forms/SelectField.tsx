// components/forms/SelectField.tsx
import React from 'react';
import { Field, FieldProps } from 'formik';

interface SelectOption {
  id: number | string;
  name: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = 'Seleccione una opción',
  required = false,
  disabled = false,
  onChange,
  className = ''
}) => {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            {...field}
            id={name}
            disabled={disabled}
            onChange={(e) => {
              form.setFieldValue(name, e.target.value);
              onChange?.(e.target.value);
            }}
            className={`mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white ${
              meta.touched && meta.error ? 'border-red-500' : ''
            } ${className}`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {meta.touched && meta.error && (
            <small className="text-red-500">{meta.error}</small>
          )}
        </div>
      )}
    </Field>
  );
};
