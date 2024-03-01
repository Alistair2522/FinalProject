// CalendarPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CalendarPage.css'; // Import CSS for styling

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { floor } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Retrieve events from local storage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Filter events based on lab prefix
    const filteredEvents = storedEvents.filter(event => {
      const labStarters = {
        first: "AX1",
        second: "AX2",
        third: "AX3",
        fourth: "AX4"
      };

      const labStarter = labStarters[floor];
      return event.lab.startsWith(labStarter);
    });

    // Format events for React Big Calendar
    const formattedEvents = filteredEvents.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));

    setEvents(formattedEvents);
  }, [floor]);

  const handleEventClick = event => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: 500 }}>
      <h1>Calendar for {floor} Floor</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
        onSelectEvent={handleEventClick}
      />
      {selectedEvent && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}>X</button>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Coordinator:</strong> {selectedEvent.coordinator}</p>
            <p><strong>Lab:</strong> {selectedEvent.lab}</p>
            <p><strong>Start:</strong> {moment(selectedEvent.start).format("MMMM Do YYYY, h:mm a")}</p>
            <p><strong>End:</strong> {moment(selectedEvent.end).format("MMMM Do YYYY, h:mm a")}</p>
            <p><strong>Feedback Link:</strong> <a href={selectedEvent.feedbackLink} target="_blank" rel="noopener noreferrer">{selectedEvent.feedbackLink}</a></p>
            <p><strong>Registration Link:</strong> <a href={selectedEvent.registrationLink} target="_blank" rel="noopener noreferrer">{selectedEvent.registrationLink}</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
