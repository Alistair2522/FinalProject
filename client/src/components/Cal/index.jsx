import { useState } from "react";
import React, { useEffect } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer , momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import './App.css';
import eventsData from './events.json';


const localizer = momentLocalizer(moment);

const Cal = () => {
  const [events, setEvents] = useState([]);

//   useEffect(() => {
//     setEvents(eventsData);
//   }, []);

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
    // Check for conflicting events
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

  return (
    <div className="container">
      <EventForm onAddEvent={handleAddEvent} />
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day','agenda']}
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

const EventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
    };
    onAddEvent(newEvent);
    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
  );
};



export default Cal;


