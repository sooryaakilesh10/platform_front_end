import React from 'react';
import CourseCard from '../components/CourseCard';
import ScheduleCard from '../components/ScheduleCard';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const courses = [
    {
      id: '1',
      title: 'UI/UX Design Fundamentals',
      progress: 65,
      module: 'Module 4: User Interface Patterns',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      status: 'current' as const,
    },
    {
      id: '2',
      title: 'Data Science Essentials',
      progress: 35,
      module: 'Module 2: Data Analysis',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      status: 'next' as const,
    },
  ];

  const schedule = [
    {
      id: '1',
      time: '10:00 AM',
      title: 'Advanced JavaScript Concepts',
      subtitle: 'With John Anderson',
      type: 'Live Session' as const,
      action: {
        label: 'Join Session',
        onClick: () => console.log('Join session'),
      },
    },
    {
      id: '2',
      time: '2:30 PM',
      title: 'UI Design Project Submission',
      subtitle: 'Final Project - Module 4',
      type: 'Assignment Due' as const,
      action: {
        label: 'Submit Work',
        onClick: () => console.log('Submit work'),
      },
    },
    {
      id: '3',
      time: '4:00 PM',
      title: 'Data Analysis Group Discussion',
      subtitle: 'With 5 other students',
      type: 'Group Study' as const,
      action: {
        label: 'Join Group',
        onClick: () => console.log('Join group'),
      },
    },
  ];

  const stats = {
    hoursSpent: 12.5,
    lessonsCompleted: 24,
    pointsEarned: 850,
    dayStreak: 15,
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Continue Learning</h2>
          <a href="/courses" className="text-indigo-600 hover:text-indigo-700">
            View All Courses
          </a>
        </div>
        <div className="space-y-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schedule.map((item) => (
            <ScheduleCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Weekly Learning Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard title="Hours Spent" value={stats.hoursSpent} icon="hours" />
          <StatsCard
            title="Lessons Completed"
            value={stats.lessonsCompleted}
            icon="lessons"
          />
          <StatsCard
            title="Points Earned"
            value={stats.pointsEarned}
            icon="points"
          />
          <StatsCard title="Day Streak" value={stats.dayStreak} icon="streak" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;