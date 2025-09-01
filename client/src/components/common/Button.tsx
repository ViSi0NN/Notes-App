import React from 'react';
import Loader from './Loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, loading = false, variant = 'primary', ...props }) => {
  const baseClasses = "w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = variant === 'primary' 
    ? "text-white bg-brand-blue hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300" 
    : "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses}`}
      disabled={loading}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;