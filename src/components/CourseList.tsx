import React from 'react';
import { Course } from '../types';
import { MoreVertical, Clock, User } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
}

const CourseList = ({ courses }: CourseListProps) => {
  const getStatusBadge = (course: Course) => {
    if (course.completed) {
      return <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">Completed</span>;
    }
    if (course.timeRemaining) {
      return <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">In Progress</span>;
    }
    return <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">Not Started</span>;
  };

  const getActionButton = (course: Course) => {
    if (course.completed) {
      return (
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          View Certificate
        </button>
      );
    }
    if (course.timeRemaining) {
      return (
        <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
          Continue
        </button>
      );
    }
    return (
      <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
        Start Course
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex">
            <div className="w-72 h-48">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between">
                <div>
                  {getStatusBadge(course)}
                  <h3 className="text-xl font-semibold mt-2">{course.title}</h3>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  {course.instructor}
                </div>
                {course.timeRemaining && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {course.timeRemaining} remaining
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                {getActionButton(course)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;