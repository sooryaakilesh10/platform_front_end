import React from 'react';
import { ArrowLeft, BookOpen, MessageSquare, FileText, Play, Pause, Settings, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LessonView = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState('14:35');
  const progress = 65;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold">UI/UX Design Fundamentals</h1>
              <p className="text-sm text-gray-600">Module 4: User Interface Patterns</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Progress: {progress}%</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Section */}
        <div className="flex-1 bg-black relative">
          <img 
            src="https://images.unsplash.com/photo-1495476479092-6ece1898a101?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Course Video"
            className="w-full h-full object-cover"
          />
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm">{currentTime} / 32:20</span>
                <div className="flex items-center space-x-4">
                  <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <Settings size={18} />
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="h-1 bg-white/30 rounded-full">
                  <div className="absolute h-1 bg-indigo-600 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button 
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? 
                    <Pause size={24} className="text-white" /> : 
                    <Play size={24} className="text-white" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="flex border-b border-gray-200">
            <button className="flex-1 px-4 py-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
              Course Content
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Resources
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="space-y-4">
                {/* Module 1 */}
                <div>
                  <button className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50">
                    <span className="text-sm font-medium">Module 1: Introduction</span>
                    <BookOpen size={16} className="text-gray-400" />
                  </button>
                </div>

                {/* Module 4 (Current) */}
                <div className="space-y-2">
                  <button className="flex items-center justify-between w-full p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <span className="text-sm font-medium">Module 4: UI Patterns</span>
                    <BookOpen size={16} />
                  </button>
                  
                  <div className="ml-4 space-y-1">
                    <button className="flex items-center justify-between w-full p-2 rounded-lg text-gray-600 hover:bg-gray-50">
                      <span className="text-sm">4.1 Introduction to Patterns</span>
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </button>
                    <button className="flex items-center justify-between w-full p-2 rounded-lg bg-indigo-100">
                      <span className="text-sm font-medium text-indigo-600">4.2 Understanding UI Patterns</span>
                      <div className="w-4 h-4 rounded-full bg-indigo-600" />
                    </button>
                    <button className="flex items-center justify-between w-full p-2 rounded-lg text-gray-600 hover:bg-gray-50">
                      <span className="text-sm">4.3 Implementing Patterns</span>
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-gray-200 p-4">
            <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Next Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;