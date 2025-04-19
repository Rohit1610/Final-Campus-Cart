import React, { useState } from 'react';

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  icon,
  iconPosition = 'left',
  type = 'text',
  ...props
}) => {
  const inputBaseStyles = 'rounded-md border focus:outline-none focus:ring-2 transition-colors px-4 py-2';
  const inputErrorStyles = error 
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20 text-error-900' 
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const iconLeftStyles = icon && iconPosition === 'left' ? 'pl-10' : '';
  const iconRightStyles = icon && iconPosition === 'right' ? 'pr-10' : '';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`
            ${inputBaseStyles}
            ${inputErrorStyles}
            ${widthStyles}
            ${iconLeftStyles}
            ${iconRightStyles}
          `}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
};

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const textareaBaseStyles = 'rounded-md border focus:outline-none focus:ring-2 transition-colors px-4 py-2';
  const textareaErrorStyles = error 
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20 text-error-900' 
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={`
          ${textareaBaseStyles}
          ${textareaErrorStyles}
          ${widthStyles}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
};

// Select Component
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  helperText,
  error,
  fullWidth = false,
  className = '',
  onChange,
  ...props
}) => {
  const selectBaseStyles = 'rounded-md border focus:outline-none focus:ring-2 transition-colors px-4 py-2 appearance-none bg-no-repeat bg-right';
  const selectErrorStyles = error 
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20 text-error-900' 
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400';
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            ${selectBaseStyles}
            ${selectErrorStyles}
            ${widthStyles}
          `}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
};

// Checkbox Component
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  helperText?: string;
  error?: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  error,
  className = '',
  onChange,
  checked,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked || false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e.target.checked);
    }
  };
  
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800"
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
        )}
        {helperText && !error && (
          <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
        {error && <p className="text-error-500">{error}</p>}
      </div>
    </div>
  );
};