import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import CourseList from '../components/CourseList';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const courses = [
    {
      id: '1',
      title: 'Advanced UI/UX Design Principles',
      progress: 65,
      instructor: 'Sarah Johnson',
      timeRemaining: '12h',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      status: 'current',
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      progress: 100,
      instructor: 'John Smith',
      completed: true,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      status: 'next',
    },
    {
      id: '3',
      title: 'Mobile App Development',
      progress: 0,
      instructor: 'Mike Brown',
      startNow: true,
      imageUrl: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      status: 'next',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Courses', count: 6 },
    { id: 'in-progress', label: 'In Progress', count: 3 },
    { id: 'completed', label: 'Completed', count: 2 },
    { id: 'not-started', label: 'Not Started', count: 1 },
  ];

  const filteredCourses = courses.filter((course) => {
    if (searchQuery) {
      return course.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    switch (activeFilter) {
      case 'in-progress':
        return course.timeRemaining;
      case 'completed':
        return course.completed;
      case 'not-started':
        return course.startNow;
      default:
        return true;
    }
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Courses</h1>
        <p className="text-gray-600">Track and manage your learning progress</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <SlidersHorizontal size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <RotateCcw size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default Courses;