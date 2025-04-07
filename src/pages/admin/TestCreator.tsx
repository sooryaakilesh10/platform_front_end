import React, { useState } from 'react';
import { Plus, Search, Clock, FileText, Users, X, Check, ChevronDown } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  group?: string;
  progress: number;
}

const TestCreator = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [groupBy, setGroupBy] = useState<'course' | 'group'>('course');
  
  const availableQuestions = [
    {
      id: 1,
      title: 'What is the time complexity of quicksort?',
      type: 'multiple-choice',
      difficulty: 'medium',
      points: 5
    },
    {
      id: 2,
      title: 'Implement a binary search function',
      type: 'coding',
      difficulty: 'hard',
      points: 10
    }
  ];

  const students: Student[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      course: 'Data Structures & Algorithms',
      group: 'Group A',
      progress: 75
    },
    {
      id: '2',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      course: 'Web Development',
      group: 'Group B',
      progress: 85
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      course: 'Data Structures & Algorithms',
      group: 'Group A',
      progress: 60
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      course: 'Machine Learning',
      group: 'Group C',
      progress: 90
    }
  ];

  const courses = Array.from(new Set(students.map(s => s.course)));
  const groups = Array.from(new Set(students.map(s => s.group).filter(Boolean)));

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    const matchesGroup = selectedGroup === 'all' || student.group === selectedGroup;
    return matchesSearch && matchesCourse && matchesGroup;
  });

  const groupedStudents = filteredStudents.reduce((acc, student) => {
    const key = groupBy === 'course' ? student.course : student.group || 'No Group';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  const handleSelectAllInGroup = (groupKey: string) => {
    const groupStudentIds = groupedStudents[groupKey].map(s => s.id);
    if (groupStudentIds.every(id => selectedStudents.includes(id))) {
      setSelectedStudents(selectedStudents.filter(id => !groupStudentIds.includes(id)));
    } else {
      setSelectedStudents([...new Set([...selectedStudents, ...groupStudentIds])]);
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Create New Test</h1>
          <p className="text-gray-600">Design and configure assessment</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Test Configuration */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Test Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter test title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Data Structures & Algorithms</option>
                  <option>Web Development</option>
                  <option>Machine Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students
                </label>
                <button
                  onClick={() => setShowStudentModal(true)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-gray-600">
                    {selectedStudents.length 
                      ? `${selectedStudents.length} students selected`
                      : 'Select students'}
                  </span>
                  <Users size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Test Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Questions</span>
                <span className="font-medium">{selectedQuestions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Points</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Time</span>
                <span className="font-medium">45 mins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Selected Students</span>
                <span className="font-medium">{selectedStudents.length}</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Create Test
          </button>
        </div>

        {/* Question Selection */}
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Select Questions</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Types</option>
                <option>Multiple Choice</option>
                <option>Coding</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {availableQuestions.map((question) => (
              <div
                key={question.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => {
                      if (selectedQuestions.includes(question.id)) {
                        setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                      } else {
                        setSelectedQuestions([...selectedQuestions, question.id]);
                      }
                    }}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <h3 className="font-medium">{question.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        question.type === 'coding'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {question.type}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        question.difficulty === 'easy'
                          ? 'bg-green-100 text-green-800'
                          : question.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="text-sm text-gray-600">
                        {question.points} points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Selection Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Select Students</h2>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Groups</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as 'course' | 'group')}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="course">Group by Course</option>
                <option value="group">Group by Study Group</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                {Object.entries(groupedStudents).map(([groupKey, groupStudents]) => (
                  <div key={groupKey} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{groupKey}</h3>
                      <button
                        onClick={() => handleSelectAllInGroup(groupKey)}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        {groupStudents.every(s => selectedStudents.includes(s.id))
                          ? 'Deselect All'
                          : 'Select All'}
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                      {groupStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4"
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => {
                                if (selectedStudents.includes(student.id)) {
                                  setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                                } else {
                                  setSelectedStudents([...selectedStudents, student.id]);
                                }
                              }}
                              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-600">{student.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {groupBy === 'course' && student.group && (
                              <span className="text-sm text-gray-600">{student.group}</span>
                            )}
                            {groupBy === 'group' && (
                              <span className="text-sm text-gray-600">{student.course}</span>
                            )}
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-2 bg-green-500 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{student.progress}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t mt-6">
              <button
                onClick={handleSelectAll}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                {selectedStudents.length === filteredStudents.length
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Select {selectedStudents.length} Students
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCreator;