import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium';
  
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100',
    accent: 'bg-accent-100 text-accent-800 dark:bg-accent-800 dark:text-accent-100',
    success: 'bg-success-100 text-success-800 dark:bg-success-800 dark:text-success-100',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100',
    error: 'bg-error-100 text-error-800 dark:bg-error-800 dark:text-error-100',
    outline: 'border border-gray-300 bg-transparent text-gray-700 dark:border-gray-600 dark:text-gray-200',
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};