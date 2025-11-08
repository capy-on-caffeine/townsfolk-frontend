import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

import { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '',
  ...props 
}: PropsWithChildren<ButtonProps>) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#9b0e0e] disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-2',
    md: 'px-6 py-2.5 rounded-lg gap-2.5',
    lg: 'px-8 py-3 text-lg rounded-xl gap-3'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#9b0e0e] to-[#7a0b0b] text-white hover:from-[#7a0b0b] hover:to-[#9b0e0e] shadow-lg shadow-red-500/20 hover:shadow-red-500/30',
    secondary: 'border-2 border-white/10 text-white hover:bg-white/5 backdrop-blur-sm',
    ghost: 'text-white hover:bg-white/5 backdrop-blur-sm'
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <span className="relative top-px">{icon}</span>}
      {children}
    </motion.button>
  );
};