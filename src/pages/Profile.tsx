import React from 'react';
import { Mail, Calendar, Trophy, BookOpen, Award, Play } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

const Profile = () => {
  // Generate GitHub-like contribution data
  const generateContributionData = () => {
    const data = [];
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 364); // Go back 52 weeks

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const contributions = Math.floor(Math.random() * 10); // Random number 0-9
      data.push({
        date: date.toISOString().split('T')[0],
        count: contributions
      });
    }
    return data;
  };

  const contributionData = generateContributionData();

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 3) return 'bg-green-100';
    if (count <= 6) return 'bg-green-300';
    return 'bg-green-500';
  };

  const stats = [
    {
      label: 'Courses Completed',
      value: '12',
      change: '+3 this month',
      changeType: 'positive'
    },
    {
      label: 'Average Score',
      value: '92%',
      change: '+5% improvement',
      changeType: 'positive'
    },
    {
      label: 'Learning Hours',
      value: '156h',
      change: '+12h this week',
      changeType: 'positive'
    }
  ];

  const skillsData = {
    labels: ['JavaScript', 'React', 'Node.js', 'UI/UX', 'Python', 'Data Science'],
    datasets: [
      {
        label: 'Skill Level',
        data: [85, 90, 75, 80, 70, 65],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Learning Hours',
        data: [20, 35, 45, 30, 55, 65],
        fill: true,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const completionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    datasets: [
      {
        label: 'Courses Completed',
        data: [2, 4, 3, 5, 4, 6, 3, 4],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const recentActivity = [
    {
      type: 'completion',
      title: 'Advanced JavaScript Patterns',
      time: '2 days ago',
      icon: BookOpen
    },
    {
      type: 'badge',
      title: 'Python Master',
      time: '4 days ago',
      icon: Award
    },
    {
      type: 'started',
      title: 'Data Visualization with D3.js',
      time: '1 week ago',
      icon: Play
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-6">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Michael Anderson</h1>
            <p className="text-gray-600">Software Developer | Learning Enthusiast</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <span>michael@example.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Joined Jan 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-gray-600 text-sm">{stat.label}</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold">{stat.value}</span>
              <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Skills Distribution</h2>
          <div className="h-[300px]">
            <Radar data={skillsData} options={chartOptions} />
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Learning Progress</h2>
          <div className="h-[300px]">
            <Line data={progressData} options={lineOptions} />
          </div>
        </div>
      </div>

      {/* Course Completion */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Course Completion by Week</h2>
        <div className="h-[300px]">
          <Bar data={completionData} options={barOptions} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${
                activity.type === 'completion' ? 'bg-green-100 text-green-600' :
                activity.type === 'badge' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <activity.icon size={20} />
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;