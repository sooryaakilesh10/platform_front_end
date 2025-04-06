import React from 'react';
import { Download, Share2, Trophy, Clock, Calendar } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  course: string;
  issueDate: string;
  completionTime: string;
  score: number;
  imageUrl: string;
}

const Certificates = () => {
  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'UI/UX Design Professional Certificate',
      course: 'UI/UX Design Fundamentals',
      issueDate: 'March 15, 2025',
      completionTime: '3 months',
      score: 95,
      imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Development',
      course: 'Modern JavaScript Programming',
      issueDate: 'February 28, 2025',
      completionTime: '2 months',
      score: 88,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
    },
    {
      id: '3',
      title: 'Data Science Foundations',
      course: 'Introduction to Data Science',
      issueDate: 'January 20, 2025',
      completionTime: '4 months',
      score: 92,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Certificates</h1>
        <p className="text-gray-600">View and share your learning achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={cert.imageUrl}
                alt={cert.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                <Trophy className="text-yellow-500" size={24} />
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
              <p className="text-gray-600 mb-4">{cert.course}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Issued {cert.issueDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{cert.completionTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Final Score</div>
                  <div className="text-2xl font-bold text-indigo-600">{cert.score}%</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;