import React, { useState } from 'react';
import { Plus, Search, Calendar, Clock, Users, X, Bell, ChevronDown, CalendarDays, BookOpen, AlertTriangle, Check } from 'lucide-react';

interface CalendarNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'event' | 'reminder' | 'deadline';
  targetGroups: string[];
  targetCourses: string[];
  notifyBefore: number;
  status: 'scheduled' | 'sent' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

interface NotificationType {
  value: 'event' | 'reminder' | 'deadline';
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface PriorityLevel {
  value: 'low' | 'medium' | 'high';
  label: string;
  color: string;
  description: string;
}

const CalendarNotifications = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notifications, setNotifications] = useState<CalendarNotification[]>([
    {
      id: '1',
      title: 'Final Project Submission',
      description: 'Submit your UI/UX Design project files',
      date: '2025-04-15',
      time: '23:59',
      type: 'deadline',
      targetGroups: ['Group A', 'Group B'],
      targetCourses: ['UI/UX Design Fundamentals'],
      notifyBefore: 24,
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Guest Lecture: Industry Trends',
      description: 'Join our special guest speaker for insights into current industry trends',
      date: '2025-04-10',
      time: '14:00',
      type: 'event',
      targetGroups: ['All Groups'],
      targetCourses: ['Web Development', 'UI/UX Design Fundamentals'],
      notifyBefore: 48,
      status: 'scheduled',
      priority: 'medium'
    }
  ]);

  const [newNotification, setNewNotification] = useState<Partial<CalendarNotification>>({
    type: 'event',
    targetGroups: [],
    targetCourses: [],
    notifyBefore: 24,
    priority: 'medium'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const notificationTypes: NotificationType[] = [
    {
      value: 'event',
      label: 'Event',
      icon: <Calendar className="w-6 h-6" />,
      description: 'Schedule live sessions, workshops, or meetings'
    },
    {
      value: 'reminder',
      label: 'Reminder',
      icon: <Bell className="w-6 h-6" />,
      description: 'Send reminders for upcoming activities or tasks'
    },
    {
      value: 'deadline',
      label: 'Deadline',
      icon: <AlertTriangle className="w-6 h-6" />,
      description: 'Set deadlines for assignments or project submissions'
    }
  ];

  const priorityLevels: PriorityLevel[] = [
    {
      value: 'low',
      label: 'Low Priority',
      color: 'bg-green-50 border-green-200 text-green-700',
      description: 'General information and updates'
    },
    {
      value: 'medium',
      label: 'Medium Priority',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      description: 'Important events and reminders'
    },
    {
      value: 'high',
      label: 'High Priority',
      color: 'bg-red-50 border-red-200 text-red-700',
      description: 'Critical deadlines and urgent notifications'
    }
  ];

  const courses = [
    'Web Development',
    'UI/UX Design Fundamentals',
    'Data Science Basics',
    'Mobile App Development'
  ];

  const groups = ['Group A', 'Group B', 'Group C', 'All Groups'];

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.date || !newNotification.time) {
      return;
    }

    const notification: CalendarNotification = {
      id: Date.now().toString(),
      title: newNotification.title,
      description: newNotification.description || '',
      date: newNotification.date,
      time: newNotification.time,
      type: newNotification.type as 'event' | 'reminder' | 'deadline',
      targetGroups: newNotification.targetGroups || [],
      targetCourses: newNotification.targetCourses || [],
      notifyBefore: newNotification.notifyBefore || 24,
      status: 'scheduled',
      priority: newNotification.priority as 'low' | 'medium' | 'high'
    };

    setNotifications([...notifications, notification]);
    setShowCreateModal(false);
    setNewNotification({
      type: 'event',
      targetGroups: [],
      targetCourses: [],
      notifyBefore: 24,
      priority: 'medium'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock size={12} />
            Scheduled
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Bell size={12} />
            Sent
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X size={12} />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'event':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Calendar size={12} />
            Event
          </span>
        );
      case 'reminder':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Bell size={12} />
            Reminder
          </span>
        );
      case 'deadline':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertTriangle size={12} />
            Deadline
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Calendar Notifications</h1>
          <p className="text-gray-600">Manage and schedule notifications for students</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Create Notification
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="event">Events</option>
            <option value="reminder">Reminders</option>
            <option value="deadline">Deadlines</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">NOTIFICATION</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">DATE & TIME</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">TYPE</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">TARGET</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id} className="border-b border-gray-200 last:border-0">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-gray-600">{notification.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>{notification.date}</div>
                    <div className="text-gray-600">{notification.time}</div>
                    <div className="text-xs text-gray-500">
                      Notify {notification.notifyBefore}h before
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getTypeBadge(notification.type)}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {notification.targetGroups.map(group => (
                        <span key={group} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {group}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {notification.targetCourses.map(course => (
                        <span key={course} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(notification.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Create Calendar Notification</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    value={newNotification.title || ''}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter notification title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newNotification.description || ''}
                    onChange={(e) => setNewNotification({ ...newNotification, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Enter notification description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {notificationTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setNewNotification({ ...newNotification, type: type.value })}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          newNotification.type === type.value
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`mb-2 ${
                            newNotification.type === type.value ? 'text-indigo-600' : 'text-gray-600'
                          }`}>
                            {type.icon}
                          </div>
                          <div className="font-medium mb-1">{type.label}</div>
                          <p className="text-xs text-gray-600">{type.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {priorityLevels.map((priority) => (
                      <button
                        key={priority.value}
                        onClick={() => setNewNotification({ ...newNotification, priority: priority.value })}
                        className={`p-4 border rounded-lg text-left ${
                          newNotification.priority === priority.value
                            ? `${priority.color} border-2`
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-medium mb-1">{priority.label}</div>
                          <p className="text-xs text-gray-600">{priority.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newNotification.date || ''}
                      onChange={(e) => setNewNotification({ ...newNotification, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newNotification.time || ''}
                      onChange={(e) => setNewNotification({ ...newNotification, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Groups
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {groups.map((group) => (
                      <button
                        key={group}
                        onClick={() => {
                          const currentGroups = newNotification.targetGroups || [];
                          if (currentGroups.includes(group)) {
                            setNewNotification({
                              ...newNotification,
                              targetGroups: currentGroups.filter(g => g !== group)
                            });
                          } else {
                            setNewNotification({
                              ...newNotification,
                              targetGroups: [...currentGroups, group]
                            });
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg border ${
                          newNotification.targetGroups?.includes(group)
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        <span>{group}</span>
                        {newNotification.targetGroups?.includes(group) && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Courses
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {courses.map((course) => (
                      <button
                        key={course}
                        onClick={() => {
                          const currentCourses = newNotification.targetCourses || [];
                          if (currentCourses.includes(course)) {
                            setNewNotification({
                              ...newNotification,
                              targetCourses: currentCourses.filter(c => c !== course)
                            });
                          } else {
                            setNewNotification({
                              ...newNotification,
                              targetCourses: [...currentCourses, course]
                            });
                          }
                        }}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg border ${
                          newNotification.targetCourses?.includes(course)
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        <span>{course}</span>
                        {newNotification.targetCourses?.includes(course) && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notify Before
                  </label>
                  <select
                    value={newNotification.notifyBefore}
                    onChange={(e) => setNewNotification({ ...newNotification, notifyBefore: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={1}>1 hour before</option>
                    <option value={24}>24 hours before</option>
                    <option value={48}>48 hours before</option>
                    <option value={72}>72 hours before</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 p-6 border-t">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNotification}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarNotifications;