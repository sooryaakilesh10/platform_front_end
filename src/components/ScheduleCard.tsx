import React from 'react';
import { ScheduleItem } from '../types';

interface ScheduleCardProps {
  item: ScheduleItem;
}

const ScheduleCard = ({ item }: ScheduleCardProps) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Live Session':
        return 'bg-green-100 text-green-800';
      case 'Assignment Due':
        return 'bg-yellow-100 text-yellow-800';
      case 'Group Study':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm font-medium text-gray-600">{item.time}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(item.type)}`}
        >
          {item.type}
        </span>
      </div>
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{item.subtitle}</p>
      <button
        onClick={item.action.onClick}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {item.action.label}
      </button>
    </div>
  );
};

export default ScheduleCard;