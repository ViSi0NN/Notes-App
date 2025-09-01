import React from 'react';
import Logo from '../../assets/logo.png';

interface User {
  name: string;
  email: string;
}

interface WelcomeHeaderProps {
  user: User;
  onSignOut: () => void;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ user, onSignOut }) => {
  return (
    <header className="px-4 sm:px-0">
      {/* Top header with Dashboard title and Sign Out */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-8 w-8 mr-3" />
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <button
          onClick={onSignOut}
          className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Welcome, {user.name} !
        </h2>
        <p className="text-sm text-gray-600">
          Email: {user.email}
        </p>
      </div>
    </header>
  );
};

export default WelcomeHeader;