import React from 'react';
import { Check, Download, Share2, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestResultsProps {
  score: number;
  timeTaken: string;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  questions: {
    id: number;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    points: number;
    explanation?: string;
  }[];
  onRetake: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({
  score,
  timeTaken,
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  questions,
  onRetake,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with Success Icon */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Test Completed!</h1>
          <p className="text-gray-600">Data Structures & Algorithms - Final Assessment</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{score}%</div>
            <div className="text-gray-600">Score</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{timeTaken}</div>
            <div className="text-gray-600">Time Taken</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{correctAnswers}/{totalQuestions}</div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">{incorrectAnswers}/{totalQuestions}</div>
            <div className="text-gray-600">Incorrect Answers</div>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Detailed Review</h2>
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        q.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {q.isCorrect ? (
                          <Check size={14} />
                        ) : (
                          <span className="text-sm">✕</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">Question {q.id}</h3>
                        <p className="text-gray-600 mt-1">{q.question}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div>
                            <span className="text-sm font-medium">Your Answer: </span>
                            <span className={`text-sm ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {q.userAnswer}
                            </span>
                          </div>
                          {!q.isCorrect && (
                            <div>
                              <span className="text-sm font-medium">Correct Answer: </span>
                              <span className="text-sm text-green-600">{q.correctAnswer}</span>
                            </div>
                          )}
                        </div>

                        {q.explanation && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm font-medium mb-1">Explanation:</h4>
                            <p className="text-sm text-gray-600">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {q.isCorrect ? `+${q.points}` : '0'} points
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={onRetake}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw size={18} />
              Retake Test
            </button>
            <button
              onClick={() => navigate('/tests')}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Tests
            </button>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={18} />
              Download Results
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 size={18} />
              Share Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;