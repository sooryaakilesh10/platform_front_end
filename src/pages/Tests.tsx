import React from 'react';
import { Clock, BookOpen, ChevronDown, Code, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Test {
  id: string;
  title: string;
  type: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  questions: number;
  courseIcon: React.ReactNode;
}

interface PastTest {
  id: string;
  name: string;
  course: string;
  date: string;
  score: number;
  status: 'Passed' | 'Failed';
}

const Tests = () => {
  const navigate = useNavigate();
  const upcomingTests: Test[] = [
    {
      id: '1',
      title: 'UI Design Principles',
      type: 'Final Assessment',
      course: 'UI/UX Design Fundamentals',
      date: 'Today',
      time: '2:30 PM - 4:30 PM',
      duration: '120 Minutes',
      questions: 50,
      courseIcon: <BookOpen className="text-indigo-600" size={20} />,
    },
    {
      id: '2',
      title: 'Web Development Basics',
      type: 'Mid-Term Quiz',
      course: 'HTML & CSS Fundamentals',
      date: 'Tomorrow',
      time: '10:00 AM - 11:00 AM',
      duration: '60 Minutes',
      questions: 30,
      courseIcon: <Code className="text-blue-600" size={20} />,
    },
    {
      id: '3',
      title: 'Digital Marketing',
      type: 'Final Exam',
      course: 'Marketing Analytics',
      date: 'Next Week',
      time: '1:00 PM - 3:00 PM',
      duration: '120 Minutes',
      questions: 75,
      courseIcon: <BarChart3 className="text-green-600" size={20} />,
    },
  ];

  const pastTests: PastTest[] = [
    {
      id: '1',
      name: 'User Research Methods',
      course: 'UX Research',
      date: 'Mar 15, 2025',
      score: 85,
      status: 'Passed',
    },
    {
      id: '2',
      name: 'JavaScript Basics',
      course: 'Web Development',
      date: 'Mar 10, 2025',
      score: 72,
      status: 'Passed',
    },
    {
      id: '3',
      name: 'SEO Fundamentals',
      course: 'Digital Marketing',
      date: 'Mar 5, 2025',
      score: 45,
      status: 'Failed',
    },
  ];

  const handleStartTest = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Upcoming Tests</h1>
        <p className="text-gray-600">Your scheduled assessments and examinations</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
          <span>All Courses</span>
          <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
          <span>All Types</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Upcoming Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingTests.map((test) => (
          <div key={test.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    test.date === 'Today' ? 'bg-red-100 text-red-800' :
                    test.date === 'Tomorrow' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {test.date}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{test.title}</h3>
                  <p className="text-gray-600 text-sm">{test.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {test.courseIcon}
                  <span>{test.course}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{test.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📝 {test.questions} Questions • {test.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => handleStartTest(test.id)}
                className={`w-full py-2 rounded-lg transition-colors ${
                  test.date === 'Today'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {test.date === 'Today' ? 'Start Test Now' : 'View Details'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Tests */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Past Tests</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">TEST NAME</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">COURSE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">DATE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">SCORE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {pastTests.map((test) => (
                <tr key={test.id} className="border-b border-gray-200 last:border-0">
                  <td className="px-6 py-4">
                    <span className="font-medium">{test.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{test.course}</td>
                  <td className="px-6 py-4 text-gray-600">{test.date}</td>
                  <td className="px-6 py-4 font-medium">{test.score}%</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                      test.status === 'Passed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tests;