import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Calendar, Award, Settings, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'My Courses', path: '/courses' },
    { icon: ClipboardList, label: 'Tests', path: '/tests' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: Award, label: 'Certificates', path: '/certificates' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">LearnHub</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;