import React from 'react';
import { Clock, CheckCircle, Star, Flame } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: 'hours' | 'lessons' | 'points' | 'streak';
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case 'hours':
        return <Clock className="text-blue-500" />;
      case 'lessons':
        return <CheckCircle className="text-green-500" />;
      case 'points':
        return <Star className="text-yellow-500" />;
      case 'streak':
        return <Flame className="text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-3 mb-2">
        {getIcon()}
        <span className="text-gray-600 text-sm">{title}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default StatsCard;