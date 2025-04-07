import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, X } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  type: 'multiple-choice' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
  course: string;
  lastModified: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  code?: string;
  testCases?: {
    input: string;
    output: string;
  }[];
  programmingLanguage?: string;
  initialCode?: string;
  constraints?: string[];
  description?: string;
  example?: {
    input: string;
    output: string;
  };
}

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [questionType, setQuestionType] = useState<'multiple-choice' | 'coding'>('multiple-choice');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState<number>(0);
  const [testCases, setTestCases] = useState<{ input: string; output: string; }[]>([{ input: '', output: '' }]);
  const [programmingLanguages] = useState(['Python', 'JavaScript', 'Java', 'C++']);
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [initialCode, setInitialCode] = useState('');
  const [constraints, setConstraints] = useState<string[]>(['']);
  const [example, setExample] = useState({ input: '', output: '' });

  const questions: Question[] = [
    {
      id: 1,
      title: 'What is the time complexity of quicksort?',
      type: 'multiple-choice',
      difficulty: 'medium',
      course: 'Data Structures & Algorithms',
      lastModified: '2025-03-15',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctAnswer: 1,
      explanation: 'Quicksort has an average time complexity of O(n log n) due to its divide-and-conquer approach.'
    },
    {
      id: 2,
      title: 'Implement a binary search function',
      type: 'coding',
      difficulty: 'hard',
      course: 'Python Programming',
      lastModified: '2025-03-14',
      code: 'def binary_search(arr, target):\n    # Your code here\n    pass',
      testCases: [
        { input: '[1, 2, 3, 4, 5], 3', output: '2' },
        { input: '[1, 2, 3, 4, 5], 6', output: '-1' }
      ]
    }
  ];

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleRemoveTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index: number, field: 'input' | 'output', value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleAddConstraint = () => {
    setConstraints([...constraints, '']);
  };

  const handleRemoveConstraint = (index: number) => {
    setConstraints(constraints.filter((_, i) => i !== index));
  };

  const handleConstraintChange = (index: number, value: string) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;
    setConstraints(newConstraints);
  };

  const handleSubmit = () => {
    // Handle form submission based on question type
    const newQuestion = {
      id: questions.length + 1,
      title: document.querySelector<HTMLInputElement>('[name="title"]')?.value || '',
      type: questionType,
      difficulty: document.querySelector<HTMLSelectElement>('[name="difficulty"]')?.value as 'easy' | 'medium' | 'hard',
      course: document.querySelector<HTMLSelectElement>('[name="course"]')?.value || '',
      lastModified: new Date().toISOString().split('T')[0],
      ...(questionType === 'multiple-choice' ? {
        options,
        correctAnswer: correctOption,
        explanation: document.querySelector<HTMLTextAreaElement>('[name="explanation"]')?.value
      } : {
        programmingLanguage: selectedLanguage,
        initialCode,
        constraints,
        description: document.querySelector<HTMLTextAreaElement>('[name="description"]')?.value,
        example,
        testCases
      })
    };

    console.log('New question:', newQuestion);
    setShowAddModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Question Bank</h1>
          <p className="text-gray-600">Manage test questions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Add Question
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="coding">Coding</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">QUESTION</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">TYPE</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">DIFFICULTY</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">COURSE</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">LAST MODIFIED</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id} className="border-b border-gray-200 last:border-0">
                <td className="px-6 py-4">
                  <span className="font-medium">{question.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    question.type === 'coding'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {question.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    question.difficulty === 'easy'
                      ? 'bg-green-100 text-green-800'
                      : question.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{question.course}</td>
                <td className="px-6 py-4 text-gray-600">{question.lastModified}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 size={16} className="text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Question</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter question title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as 'multiple-choice' | 'coding')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="coding">Programming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select 
                    name="difficulty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course
                  </label>
                  <select 
                    name="course"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>Data Structures & Algorithms</option>
                    <option>Web Development</option>
                    <option>Python Programming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    type="number"
                    name="points"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="5"
                  />
                </div>
              </div>

              {questionType === 'multiple-choice' ? (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Answer Options
                    </label>
                    <button
                      onClick={handleAddOption}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Add Option
                    </button>
                  </div>
                  <div className="space-y-3">
                    {options.map((option, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={correctOption === index}
                          onChange={() => setCorrectOption(index)}
                          className="mt-3"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        {options.length > 2 && (
                          <button
                            onClick={() => handleRemoveOption(index)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <X size={16} className="text-gray-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Problem Description
                    </label>
                    <textarea
                      name="description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={4}
                      placeholder="Describe the programming problem..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Programming Language
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {programmingLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Initial Code
                    </label>
                    <textarea
                      value={initialCode}
                      onChange={(e) => setInitialCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={6}
                      placeholder="def solution():\n    pass"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Constraints
                      </label>
                      <button
                        onClick={handleAddConstraint}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        Add Constraint
                      </button>
                    </div>
                    <div className="space-y-3">
                      {constraints.map((constraint, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={constraint}
                              onChange={(e) => handleConstraintChange(index, e.target.value)}
                              placeholder="e.g., 1 <= n <= 10^5"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          {constraints.length > 1 && (
                            <button
                              onClick={() => handleRemoveConstraint(index)}
                              className="p-2 hover:bg-gray-100 rounded-full"
                            >
                              <X size={16} className="text-gray-600" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Example
                    </label>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Input</label>
                        <textarea
                          value={example.input}
                          onChange={(e) => setExample({ ...example, input: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={2}
                          placeholder="Example input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Output</label>
                        <textarea
                          value={example.output}
                          onChange={(e) => setExample({ ...example, output: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          rows={2}
                          placeholder="Example output"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Test Cases
                      </label>
                      <button
                        onClick={handleAddTestCase}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        Add Test Case
                      </button>
                    </div>
                    <div className="space-y-4">
                      {testCases.map((testCase, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={testCase.input}
                              onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                              placeholder="Input"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                              type="text"
                              value={testCase.output}
                              onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                              placeholder="Expected Output"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          {testCases.length > 1 && (
                            <button
                              onClick={() => handleRemoveTestCase(index)}
                              className="p-2 hover:bg-gray-100 rounded-full"
                            >
                              <X size={16} className="text-gray-600" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation
                </label>
                <textarea
                  name="explanation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Explain the correct answer..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;