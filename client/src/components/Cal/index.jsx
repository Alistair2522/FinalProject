import { useState } from "react";
import React, { useEffect } from 'react';
import styles from "./styles.module.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { Calendar, dateFnsLocalizer , momentLocalizer} from "react-big-calendar";
import getDay from "date-fns/getDay";
import moment from 'moment';
import eventsData from './events.json';
// const locales = {
//     "en-IN": require("date-fns/locale/en-IN")
// }
// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales
// })

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2024,2,0),
//         end: new Date(2024,2,0)
//     },
//     {
//         title: "Vacation",
//         allDay: true,
//         start: new Date(2024,1,25),
//         end: new Date(2024,1,25)
//     },
//     {
//         title: "Conference",
//         allDay: true,
//         start: new Date(2024,3,21),
//         end: new Date(2024,3,21)
//     },
// ]

// function Cal(){
//     return(
//         <div className="Cal">
//             <Calendar localizer={localizer} events={events}
//             startAccessor="start" endAccessor="end" style={{height:500, margin:"50px"}}/>
//         </div>
//     );
// }


const localizer = momentLocalizer(moment);

const Cal = () => {
    const [events, setEvents] = useState([]);
    const handleAddEvent = (newEvent) => {
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
      
        // Save updatedEvents to localStorage
        localStorage.setItem('events', JSON.stringify(updatedEvents));
      };
      
      // When the component mounts, retrieve events from localStorage
      useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      }, []);
    

  return (
    <div style={{ height: '500px' }}>
      <EventForm onAddEvent={handleAddEvent} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
      />
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
    <form onSubmit={handleSubmit}>
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