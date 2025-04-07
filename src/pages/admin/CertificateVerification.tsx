import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, Download, ExternalLink, Check, X } from 'lucide-react';

interface VerificationRequest {
  id: string;
  certificateId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  organization: string;
  purpose: string;
  documents?: {
    name: string;
    url: string;
    type: string;
  }[];
  verificationNotes?: string;
  verifiedBy?: string;
  verificationDate?: string;
}

const CertificateVerification = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  const verificationRequests: VerificationRequest[] = [
    {
      id: 'VR-001',
      certificateId: 'CERT-2025-001-UIUX',
      studentName: 'Sarah Johnson',
      courseName: 'UI/UX Design Professional Certificate',
      issueDate: 'March 15, 2025',
      requestDate: 'March 20, 2025',
      status: 'pending',
      requestedBy: 'John Smith',
      organization: 'Tech Corp Inc.',
      purpose: 'Employment Verification',
      documents: [
        {
          name: 'Employment Offer Letter',
          url: '#',
          type: 'application/pdf'
        },
        {
          name: 'ID Verification',
          url: '#',
          type: 'image/jpeg'
        }
      ]
    },
    {
      id: 'VR-002',
      certificateId: 'CERT-2025-002-JS',
      studentName: 'Michael Brown',
      courseName: 'Advanced JavaScript Development',
      issueDate: 'February 28, 2025',
      requestDate: 'March 19, 2025',
      status: 'approved',
      requestedBy: 'Emma Wilson',
      organization: 'Dev Solutions Ltd.',
      purpose: 'Background Check',
      verificationNotes: 'All documents verified successfully. Certificate authenticity confirmed.',
      verifiedBy: 'Admin User',
      verificationDate: 'March 20, 2025'
    },
    {
      id: 'VR-003',
      certificateId: 'CERT-2025-003-DS',
      studentName: 'Emily Davis',
      courseName: 'Data Science Foundations',
      issueDate: 'January 20, 2025',
      requestDate: 'March 18, 2025',
      status: 'rejected',
      requestedBy: 'David Lee',
      organization: 'Data Analytics Co.',
      purpose: 'Academic Verification',
      verificationNotes: 'Unable to verify student identity. Please provide additional documentation.',
      verifiedBy: 'Admin User',
      verificationDate: 'March 19, 2025'
    }
  ];

  const handleViewDetails = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setVerificationNotes(request.verificationNotes || '');
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (requestId: string, newStatus: 'approved' | 'rejected') => {
    if (!verificationNotes.trim()) {
      alert('Please provide verification notes before updating the status.');
      return;
    }

    // Here you would typically make an API call to update the status
    console.log(`Updating request ${requestId} to ${newStatus}`);
    console.log('Verification Notes:', verificationNotes);
    setShowDetailsModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            <Clock size={14} />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <CheckCircle size={14} />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = 
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.certificateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Certificate Verification Requests</h1>
        <p className="text-gray-600">Manage and respond to certificate verification requests</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, certificate ID, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">REQUEST ID</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">CERTIFICATE ID</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">STUDENT</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">ORGANIZATION</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">REQUEST DATE</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">STATUS</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="border-b border-gray-200 last:border-0">
                <td className="px-6 py-4 font-medium">{request.id}</td>
                <td className="px-6 py-4 font-mono text-sm">{request.certificateId}</td>
                <td className="px-6 py-4">{request.studentName}</td>
                <td className="px-6 py-4">{request.organization}</td>
                <td className="px-6 py-4">{request.requestDate}</td>
                <td className="px-6 py-4">{getStatusBadge(request.status)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold">Verification Request Details</h2>
                <p className="text-gray-600">Request ID: {selectedRequest.id}</p>
              </div>
              {getStatusBadge(selectedRequest.status)}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-4">Certificate Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600">Certificate ID</label>
                    <p className="font-mono">{selectedRequest.certificateId}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Student Name</label>
                    <p>{selectedRequest.studentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Course</label>
                    <p>{selectedRequest.courseName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Issue Date</label>
                    <p>{selectedRequest.issueDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Request Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600">Requested By</label>
                    <p>{selectedRequest.requestedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Organization</label>
                    <p>{selectedRequest.organization}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Purpose</label>
                    <p>{selectedRequest.purpose}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Request Date</label>
                    <p>{selectedRequest.requestDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Documents */}
            {selectedRequest.documents && selectedRequest.documents.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-4">Supporting Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedRequest.documents.map((doc, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{doc.name}</span>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Download size={16} />
                        </a>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{doc.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification History */}
            {selectedRequest.verificationDate && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Verification History</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-600">Verified by:</span> {selectedRequest.verifiedBy}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Verification Date:</span> {selectedRequest.verificationDate}
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Notes:</span> {selectedRequest.verificationNotes}
                  </p>
                </div>
              </div>
            )}

            {/* Verification Notes */}
            {selectedRequest.status === 'pending' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Notes
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={4}
                  placeholder="Enter verification notes..."
                />
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              
              {selectedRequest.status === 'pending' ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'rejected')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                    Reject Request
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'approved')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check size={16} />
                    Approve Request
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download size={16} />
                    Download Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <ExternalLink size={16} />
                    Send Response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;