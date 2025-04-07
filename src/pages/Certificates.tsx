import React, { useState } from 'react';
import { Download, Share2, Trophy, Clock, Calendar, Search, CheckCircle, XCircle, Copy } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  course: string;
  issueDate: string;
  completionTime: string;
  score: number;
  imageUrl: string;
  verificationId: string;
}

const Certificates = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null);

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'UI/UX Design Professional Certificate',
      course: 'UI/UX Design Fundamentals',
      issueDate: 'March 15, 2025',
      completionTime: '3 months',
      score: 95,
      imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      verificationId: 'CERT-2025-001-UIUX'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Development',
      course: 'Modern JavaScript Programming',
      issueDate: 'February 28, 2025',
      completionTime: '2 months',
      score: 88,
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      verificationId: 'CERT-2025-002-JS'
    },
    {
      id: '3',
      title: 'Data Science Foundations',
      course: 'Introduction to Data Science',
      issueDate: 'January 20, 2025',
      completionTime: '4 months',
      score: 92,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      verificationId: 'CERT-2025-003-DS'
    }
  ];

  const handleVerify = () => {
    // Simulate verification process
    const certificate = certificates.find(cert => cert.verificationId === verificationId);
    setVerificationResult(certificate ? 'valid' : 'invalid');
  };

  const handleCopyVerificationId = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Certificates</h1>
          <p className="text-gray-600">View and share your learning achievements</p>
        </div>
        <button
          onClick={() => setShowVerifyModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Verify Certificate
        </button>
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

              <div className="flex items-center justify-between mb-4">
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

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-600">Verification ID: </span>
                  <span className="font-mono">{cert.verificationId}</span>
                </div>
                <button
                  onClick={() => handleCopyVerificationId(cert.verificationId)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Copy size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Verify Certificate</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Certificate Verification ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={verificationId}
                  onChange={(e) => setVerificationId(e.target.value)}
                  placeholder="e.g., CERT-2025-001-UIUX"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {verificationResult && (
              <div className={`p-4 rounded-lg mb-6 ${
                verificationResult === 'valid'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                <div className="flex items-center gap-2">
                  {verificationResult === 'valid' ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Certificate is valid and authentic</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} />
                      <span>Invalid certificate ID</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowVerifyModal(false);
                  setVerificationId('');
                  setVerificationResult(null);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={handleVerify}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;