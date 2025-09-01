import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isOTP?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', isOTP = false, ...props }) => {
  const [showOTP, setShowOTP] = useState(false);
  
  const toggleOTPVisibility = () => {
    setShowOTP(!showOTP);
  };

  const inputType = isOTP ? (showOTP ? 'text' : 'password') : type;
  const placeholder = props.placeholder || ' '; 

  return (
    <div className="relative mb-6"> 
      <input
        id={props.id || props.name}
        type={inputType}
        className="peer block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent 
                   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={placeholder}
        {...props}
      />
      <label
        htmlFor={props.id || props.name}
        className="absolute left-3 top-2 text-gray-400 text-base transition-all duration-200 ease-in-out pointer-events-none
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                   peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1
                   peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
      >
        {label}
      </label>
      {isOTP && (
        <button
          type="button"
          onClick={toggleOTPVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showOTP ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
        </button>
      )}
    </div>
  );
};

export default Input;