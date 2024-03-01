import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Cal_no_input = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const handleSelect = ({ start, end }) => {
    const newEvent = {
      title: '',
      description: '',
      coordinator: '',
      lab: '',
      feedbackLink: '',
      registrationLink: '',
      start,
      end,
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '50px' }}
          onSelectSlot={handleSelect}
          onSelectEvent={handleEventSelect}
        />
      </div>
      {selectedEvent && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 9999,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2>{selectedEvent.title}</h2>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <p><strong>Coordinator:</strong> {selectedEvent.coordinator}</p>
          <p><strong>Lab:</strong> {selectedEvent.lab}</p>
          <p><strong>Feedback Link:</strong> <a href={selectedEvent.feedbackLink} target="_blank" rel="noopener noreferrer">{selectedEvent.feedbackLink}</a></p>
          <p><strong>Registration Link:</strong> <a href={selectedEvent.registrationLink} target="_blank" rel="noopener noreferrer">{selectedEvent.registrationLink}</a></p>
          <p><strong>Start:</strong> {moment(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
          <p><strong>End:</strong> {moment(selectedEvent.end).format('YYYY-MM-DD HH:mm')}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
      {selectedEvent && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
          }}
          onClick={handleClose}
        />
      )}
    </div>
  );
};

export default Cal_no_input;
