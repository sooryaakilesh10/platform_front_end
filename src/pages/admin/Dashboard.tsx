import React from 'react';
import { Users, BookOpen, Award, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,845',
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Courses',
      value: '48',
      change: '+4.3%',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Certificates Issued',
      value: '1,257',
      change: '+8.1%',
      icon: Award,
      color: 'bg-yellow-500'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+15.2%',
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Course Enrollments',
        data: [650, 750, 850, 800, 900, 1000],
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const recentActivities = [
    {
      user: 'Sarah Johnson',
      action: 'completed',
      course: 'Advanced JavaScript',
      time: '2 hours ago'
    },
    {
      user: 'Mike Brown',
      action: 'enrolled in',
      course: 'UI/UX Design Fundamentals',
      time: '4 hours ago'
    },
    {
      user: 'Emily Davis',
      action: 'earned certificate in',
      course: 'Python Programming',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your learning platform</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Add New Course
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span className="text-green-600 text-sm">{stat.change} this month</span>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Enrollment Trend</h2>
          <div className="h-[300px]">
            <Line data={enrollmentData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium">{activity.course}</span>
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;