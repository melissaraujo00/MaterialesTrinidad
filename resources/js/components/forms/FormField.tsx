// components/forms/FormField.tsx
import React from 'react';
import { Field, FieldProps } from 'formik';

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white ${
              meta.touched && meta.error ? 'border-red-500' : ''
            } ${className}`}
          />
          {meta.touched && meta.error && (
            <small className="text-red-500">{meta.error}</small>
          )}
        </div>
      )}
    </Field>
  );
};
