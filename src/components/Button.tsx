import { PropsWithChildren } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}: PropsWithChildren<ButtonProps>) => {
  const baseClasses = 'px-6 py-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50';
  const variantClasses = {
    primary: 'bg-[#9b0e0e] text-white hover:bg-[#7a0b0b]',
    secondary: 'border-2 border-[#9b0e0e] text-[#9b0e0e] hover:bg-[#9b0e0e] hover:text-white'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};