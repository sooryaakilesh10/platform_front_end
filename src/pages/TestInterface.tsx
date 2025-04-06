import React, { useState, useEffect } from 'react';
import { Play, RotateCw, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TestResults from '../components/TestResults';

interface TestQuestion {
  type: 'multiple-choice' | 'coding';
  id: number;
  text: string;
  code?: string;
  options?: string[];
  programmingLanguage?: string;
  initialCode?: string;
  testCases?: {
    input: string;
    expected: string;
    output?: string;
    passed?: boolean;
  }[];
  constraints?: string[];
  description?: string;
  example?: {
    input: string;
    output: string;
  };
  correctAnswer?: number;
  explanation?: string;
}

const TestInterface = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [timeTaken, setTimeTaken] = useState('00:00');

  const [questions] = useState<TestQuestion[]>([
    {
      type: 'multiple-choice',
      id: 1,
      text: 'Which data structure would be most efficient for implementing a cache with a Least Recently Used (LRU) eviction policy?',
      options: [
        'Array',
        'Hash Map with Doubly Linked List',
        'Binary Search Tree',
        'Stack'
      ],
      correctAnswer: 1,
      explanation: 'A Hash Map with Doubly Linked List provides O(1) access time and allows for efficient removal and addition of elements, making it ideal for LRU cache implementation.'
    },
    {
      type: 'coding',
      id: 2,
      text: 'Binary Tree Traversal',
      description: 'Implement an inorder traversal of a binary tree. Return the values of the nodes in an array.',
      programmingLanguage: 'Python',
      initialCode: `def inorder_traversal(root):
    # Your code here
    pass

# Test cases
class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None`,
      constraints: [
        'The number of nodes in the tree is in range [0, 100]',
        '-100 <= Node.val <= 100'
      ],
      example: {
        input: 'Input: [1,null,2,3]\n    1\n     \\\n      2\n     /\n    3',
        output: 'Output: [1,3,2]'
      },
      testCases: [
        {
          input: '[1,2,3]',
          expected: '[2,1,3]',
          passed: true
        },
        {
          input: '[1,null,2]',
          expected: '[1,2]',
          passed: false
        }
      ]
    },
    {
      type: 'multiple-choice',
      id: 3,
      text: 'What is the time complexity of quicksort in the average case?',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n²)',
        'O(log n)'
      ],
      correctAnswer: 1,
      explanation: 'Quicksort has an average time complexity of O(n log n) due to its divide-and-conquer approach.'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    // Simulate running code and getting test results
    console.log('Running code:', code);
  };

  const handleReset = () => {
    setCode(questions[currentQuestionIndex].initialCode || '');
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    const detailedResults = questions.map(q => {
      if (q.type === 'multiple-choice') {
        const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
        if (isCorrect) correct++;
        else incorrect++;

        return {
          id: q.id,
          question: q.text,
          userAnswer: q.options?.[selectedAnswers[q.id]] || 'Not answered',
          correctAnswer: q.options?.[q.correctAnswer!] || '',
          isCorrect,
          points: isCorrect ? 5 : 0,
          explanation: q.explanation
        };
      } else {
        // For coding questions, use test case results
        const allTestsPassed = q.testCases?.every(test => test.passed) ?? false;
        if (allTestsPassed) correct++;
        else incorrect++;

        return {
          id: q.id,
          question: q.text,
          userAnswer: 'Code submission',
          correctAnswer: 'Expected implementation',
          isCorrect: allTestsPassed,
          points: allTestsPassed ? 10 : 0,
          explanation: allTestsPassed ? 
            'All test cases passed successfully.' : 
            'Some test cases failed. Review the implementation.'
        };
      }
    });

    const totalTime = 1800 - timeRemaining; // Calculate time taken
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return {
      score: Math.round((correct / questions.length) * 100),
      timeTaken: formattedTime,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      totalQuestions: questions.length,
      questions: detailedResults
    };
  };

  const handleSubmit = () => {
    const results = calculateResults();
    setTimeTaken(results.timeTaken);
    setIsTestSubmitted(true);
  };

  const handleRetake = () => {
    setIsTestSubmitted(false);
    setTimeRemaining(1800);
    setSelectedAnswers({});
    setCode('');
    setCurrentQuestionIndex(0);
    setFlaggedQuestions(new Set());
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const toggleFlagQuestion = (index: number) => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(index)) {
      newFlagged.delete(index);
    } else {
      newFlagged.add(index);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  if (isTestSubmitted) {
    const results = calculateResults();
    return (
      <TestResults
        score={results.score}
        timeTaken={results.timeTaken}
        correctAnswers={results.correctAnswers}
        incorrectAnswers={results.incorrectAnswers}
        totalQuestions={results.totalQuestions}
        questions={results.questions}
        onRetake={handleRetake}
      />
    );
  }

  const question = questions[currentQuestionIndex];

  const renderQuestionContent = () => {
    if (question.type === 'multiple-choice') {
      return (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedAnswers[question.id] === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[question.id] === index
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[question.id] === index && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm"
              >
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-1"
                >
                  <RotateCw size={16} />
                  Reset
                </button>
                <button
                  onClick={handleRun}
                  className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1 text-sm"
                >
                  <Play size={16} />
                  Run
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-[#1e1e1e] text-white font-mono text-sm min-h-[400px]">
            <pre>{question.initialCode}</pre>
          </div>
        </div>

        {/* Test Results */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Test Results</h3>
          <div className="space-y-4">
            {question.testCases?.map((test, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  test.passed ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium">
                    Test Case {index + 1}: {test.passed ? 'Passed' : 'Failed'}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>Input: {test.input}</div>
                  <div>Expected: {test.expected}</div>
                  <div>Output: {test.output || '---'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Data Structures & Algorithms - Mixed Assessment</h1>
              <p className="text-gray-600">Question {currentQuestionIndex + 1}: {question.text}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">{formatTime(timeRemaining)}</div>
                <div className="text-sm text-gray-600">Time Remaining</div>
              </div>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`p-2 rounded-lg ${
                  currentQuestionIndex === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`p-2 rounded-lg ${
                  currentQuestionIndex === questions.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex gap-2">
              {questions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center relative ${
                    currentQuestionIndex === index
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                  {flaggedQuestions.has(index) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => toggleFlagQuestion(currentQuestionIndex)}
              className={`p-2 rounded-lg ${
                flaggedQuestions.has(currentQuestionIndex)
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Flag size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-6">
        <div className="flex gap-6">
          {/* Main Content */}
          {renderQuestionContent()}

          {/* Problem Description */}
          <div className="w-96">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Question Details</h3>
              {question.type === 'coding' ? (
                <>
                  <p className="text-gray-600 mb-6">{question.description}</p>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Example:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <pre>{question.example?.input}</pre>
                      <pre className="mt-2">{question.example?.output}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Constraints:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {question.constraints?.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-gray-600">
                  <p>Select the best answer from the options provided.</p>
                  {selectedAnswers[question.id] !== undefined && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Explanation:</h4>
                      <p className="text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;