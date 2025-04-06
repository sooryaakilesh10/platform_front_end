import React from 'react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/lesson/ui-patterns');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex space-x-4">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-32 h-32 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm font-medium text-indigo-600">
              {course.status === 'current' ? 'Currently Watching' : 'Next Up'}
            </span>
            <h3 className="text-lg font-semibold mt-1">{course.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{course.module}</p>
          </div>
          <span className="text-sm text-gray-500">{course.progress}% Complete</span>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <button 
            onClick={handleContinue}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {course.status === 'current' ? 'Resume Learning' : 'Continue Course'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;