import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus, X, Trash2 } from 'lucide-react';

const Calendar = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'lesson'
  });

  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'UI Design Fundamentals',
      date: '2025-03-20',
      backgroundColor: '#818cf8',
      borderColor: '#818cf8',
      className: 'lesson-event'
    },
    {
      id: '2',
      title: 'Group Study: Data Structures',
      date: '2025-03-21',
      backgroundColor: '#34d399',
      borderColor: '#34d399',
      className: 'study-event'
    },
    {
      id: '3',
      title: 'JavaScript Assessment',
      date: '2025-03-22',
      backgroundColor: '#f87171',
      borderColor: '#f87171',
      className: 'test-event'
    }
  ]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setShowEventModal(true);
  };

  const handleEventClick = (arg: any) => {
    setSelectedEvent(arg.event);
    setShowEventModal(true);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'lesson':
        return '#818cf8';
      case 'study':
        return '#34d399';
      case 'test':
        return '#f87171';
      default:
        return '#818cf8';
    }
  };

  const handleEventAdd = () => {
    const newCalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      backgroundColor: getEventColor(newEvent.type),
      borderColor: getEventColor(newEvent.type),
      className: `${newEvent.type}-event`
    };

    setEvents([...events, newCalendarEvent]);
    setShowEventModal(false);
    setNewEvent({
      title: '',
      type: 'lesson'
    });
    setSelectedEvent(null);
  };

  const handleEventRemove = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  const closeModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      type: 'lesson'
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Learning Calendar</h1>
        <p className="text-gray-600">Manage your classes, assignments, and study sessions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Add Event
          </button>
        </div>

        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
          />
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedEvent ? 'Edit Event' : 'Add Learning Event'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={selectedEvent ? selectedEvent.title : newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter event title"
                  readOnly={!!selectedEvent}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={!!selectedEvent}
                >
                  <option value="lesson">Lesson</option>
                  <option value="study">Study Group</option>
                  <option value="test">Test/Assessment</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                {selectedEvent ? (
                  <button
                    onClick={handleEventRemove}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Remove Event
                  </button>
                ) : (
                  <>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEventAdd}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Add Event
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;