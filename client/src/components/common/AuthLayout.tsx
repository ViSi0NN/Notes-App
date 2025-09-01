import React from 'react';
import Windows11Image from '../../assets/windows-11.png';
import Logo from '../../assets/logo.png';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Logo" className="h-8 w-8 mr-3" />
            <h1 className="text-xl font-bold text-gray-800">HD</h1>
          </div>
          {children}
        </div>

        <div className="hidden md:block md:w-3/4 p-3">
          <img
            src={Windows11Image}
            alt="Abstract background"
            className="object-fill w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;