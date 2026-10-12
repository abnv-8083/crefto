import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full cursor-pointer select-none';
  
  const variantClasses = {
    primary: 'bg-[#FF3838] hover:bg-[#ff2020] text-white shadow-[0_0_20px_rgba(255,56,56,0.35)] hover:shadow-[0_0_30px_rgba(255,56,56,0.55)] border border-[#ff4e4e]',
    outline: 'bg-transparent hover:bg-[#1a1a22] text-[#e2e8f0] border border-[#2e2e38] hover:border-[#444452] hover:text-white',
    ghost: 'bg-transparent hover:bg-[#1a1a22] text-[#9ca3af] hover:text-white'
  };

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`btn-custom ${variant} ${size} ${widthClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};
