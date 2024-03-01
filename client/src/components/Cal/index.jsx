import { useState } from "react";
import React, { useEffect } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import './App.css';
import eventsData from './events.json';

const localizer = momentLocalizer(moment);

const Cal = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [lab, setLab] = useState('');
  const [feedbackLink, setFeedbackLink] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const labOptions = [
    { value: 'AX410', label: 'AX410' },
    { value: 'AX412', label: 'AX412' },
    { value: 'AX414', label: 'AX414' }
  ];

  const eventStyleGetter = (event, start, end, isSelected) => {
    const eventDate = moment(event.start);
    const currentDate = moment();
    const isPastEvent = eventDate.isBefore(currentDate, 'day');
    const isCurrentDayEvent = eventDate.isSame(currentDate, 'day');

    let style = {};
    if (isPastEvent) {
      style.backgroundColor = 'red';
    } else if (isCurrentDayEvent) {
      style.backgroundColor = 'green';
    } else {
      style.backgroundColor = 'blue';
    }

    return {
      style: style
    };
  };

  const handleAddEvent = (newEvent) => {
    const isConflict = events.some(event => {
      return (
        (moment(newEvent.start).isSameOrAfter(event.start) && moment(newEvent.start).isBefore(event.end)) ||
        (moment(newEvent.end).isAfter(event.start) && moment(newEvent.end).isSameOrBefore(event.end))
      );
    });

    if (isConflict) {
      alert('Conflicting event! Please select a different time.');
      return;
    }

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="container">
      <div className="calendar-container">
        <div className="calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'week', 'day', 'agenda']}
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
          />
        </div>
      </div>
      <div className="input-container">
        <div className="event-form">
          <form onSubmit={(e) => {
            e.preventDefault();
            const newEvent = {
              title,
              description,
              coordinator,
              lab,
              feedbackLink,
              registrationLink,
              start: new Date(start),
              end: new Date(end),
            };
            handleAddEvent(newEvent);
            setTitle('');
            setDescription('');
            setCoordinator('');
            setLab('');
            setFeedbackLink('');
            setRegistrationLink('');
            setStart('');
            setEnd('');
          }}>
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Event Coordinator"
              value={coordinator}
              onChange={(e) => setCoordinator(e.target.value)}
            />
            <select
              value={lab}
              onChange={(e) => setLab(e.target.value)}
            >
              <option value="">Select Lab Number</option>
              {labOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Feedback Link"
              value={feedbackLink}
              onChange={(e) => setFeedbackLink(e.target.value)}
            />
            <input
              type="text"
              placeholder="Registration Link"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
            />
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
            <button type="submit">Add Event</button>
          </form>
        </div>
        <div className="event-details">
          {selectedEvent && (
            <div>
              <h3>Event Details</h3>
              <p>Title: {selectedEvent.title}</p>
              <p>Description: {selectedEvent.description}</p>
              <p>Coordinator: {selectedEvent.coordinator}</p>
              <p>Lab: {selectedEvent.lab}</p>
              <p>Feedback Link: {selectedEvent.feedbackLink}</p>
              <p>Registration Link: {selectedEvent.registrationLink}</p>
              <p>Start Time: {moment(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
              <p>End Time: {moment(selectedEvent.end).format('YYYY-MM-DD HH:mm')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cal;
