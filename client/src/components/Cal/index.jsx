import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

const localizer = momentLocalizer(moment);

const Cal = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [lab, setLab] = useState("");
  const [feedbackLink, setFeedbackLink] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Load events from local storage on component mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  // Save events to local storage whenever events state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const labOptions = [
    { value: "AX105", label: "AX105" },
    { value: "AX108", label: "AX108" },
    { value: "AX110", label: "AX110" },
    { value: "AX111", label: "AX111" },
    { value: "AX112", label: "AX112" },
    { value: "AX205", label: "AX205" },
    { value: "AX208", label: "AX208" },
    { value: "AX210", label: "AX210" },
    { value: "AX211", label: "AX211" },
    { value: "AX212", label: "AX212" },
    { value: "AX305", label: "AX305" },
    { value: "AX308", label: "AX308" },
    { value: "AX310", label: "AX310" },
    { value: "AX311", label: "AX311" },
    { value: "AX312", label: "AX312" },
    { value: "AX405", label: "AX405" },
    { value: "AX408", label: "AX408" },
    { value: "AX410", label: "AX410" },
    { value: "AX411", label: "AX411" },
    { value: "AX412", label: "AX412" }
  ];

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      coordinator,
      lab,
      feedbackLink,
      registrationLink,
      start: new Date(start),
      end: new Date(end)
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    // Clear input fields
    setTitle("");
    setDescription("");
    setCoordinator("");
    setLab("");
    setFeedbackLink("");
    setRegistrationLink("");
    setStart("");
    setEnd("");
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
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
          onSelectEvent={handleEventClick}
        />
      </div>
    </div>
    {selectedEvent && (
      <div>
        <div className="popup-overlay" onClick={handleClosePopup}></div>
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={handleClosePopup}>
                Close
              </button>
              <h3>{selectedEvent.title}</h3>
              <p>Description: {selectedEvent.description}</p>
              <p>Coordinator: {selectedEvent.coordinator}</p>
              <p>Lab: {selectedEvent.lab}</p>
              <p>Feedback Link: {selectedEvent.feedbackLink}</p>
              <p>Registration Link: {selectedEvent.registrationLink}</p>
              <p>
                Start Time:{" "}
                {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
              </p>
              <p>
                End Time:{" "}
                {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
      <div className="input-container">
        <div className="event-form">
          <form onSubmit={handleAddEvent}>
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
      </div>
    </div>
  );
};

export default Cal;
