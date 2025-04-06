import React from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  userName: string;
}

const Header = ({ userName }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-gray-600">Pick up where you left off</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={24} className="text-gray-600" />
        </button>
        <Link to="/profile">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header