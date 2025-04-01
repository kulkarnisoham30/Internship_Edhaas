import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ExpertCalendar = ({ expert, onBookAppointment, appointments, onGoBack }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date()); // ✅ Now we have a state for the calendar date

  // Handle slot selection
  const handleSelectSlot = ({ start }) => {
    setSelectedSlot(moment(start).format("DD MMMM YYYY, HH:mm"));
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };
  
  <Calendar
    localizer={localizer}
    events={appointments}
    selectable
    onSelectSlot={handleSelectSlot}
    defaultView={Views.MONTH}
    views={["month", "week", "day", "agenda"]}
    date={currentDate} 
    onNavigate={handleNavigate} // ✅ Fix: Ensure navigation works
    style={{ height: 500, margin: "20px 0" }}
  />
  

  // Confirm appointment
  const handleConfirmBooking = () => {
    if (!selectedSlot) return;
    onBookAppointment(selectedSlot);
    setSelectedSlot(null);
  };

  // ✅ Fix: Navigation Functions
  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month").toDate());
  };

  const handlePrevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">{expert.name}'s Calendar</h2>
        <button
          onClick={onGoBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Experts
        </button>
      </div>

      {/* Calendar with dynamic date state */}
      <Calendar
        localizer={localizer}
        events={appointments.map(appt => ({
          title: `Booked by ${appt.name}`,
          start: new Date(appt.date),
          end: moment(appt.date).add(1, "hour").toDate(),
        }))}
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView={Views.MONTH}
        views={{ month: true, week: true, day: true }}
        date={currentDate} // ✅ Fix: This makes sure the calendar updates when we change the month
        onNavigate={setCurrentDate} // ✅ Allows user to navigate using built-in controls
        style={{ height: 500, margin: "20px 0" }}
        formats={{
          dayFormat: (date) => moment(date).format("DD MMMM YYYY"),
          weekdayFormat: (date) => moment(date).format("dddd"),
        }}
      />

      {selectedSlot && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <p className="text-gray-700">
            Confirm appointment for: <strong>{selectedSlot}</strong>
          </p>
          <button
            onClick={handleConfirmBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertCalendar;
