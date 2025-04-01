import React, { useState } from "react";
import { toast } from "react-toastify";

const ExpertDashboard = ({ expert, appointments, onReschedule }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");

  // ✅ Filter appointments to show only those for the selected expert
  const expertAppointments = appointments.filter(appt => appt.expert === expert.name);

  const handleReschedule = () => {
    if (newDate) {
      onReschedule(selectedAppointment.id, newDate);
      setSelectedAppointment(null);
      setNewDate("");
      toast.info("Appointment Rescheduled Successfully!");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700">Expert Dashboard</h2>
      <p className="text-gray-500 mt-2">
        Welcome, <span className="font-semibold">{expert.name}</span>
      </p>

      <h3 className="text-xl font-semibold mt-4">Confirmed Appointments:</h3>
      {expertAppointments.length === 0 ? (
        <p className="text-gray-400">No appointments yet.</p>
      ) : (
        <ul className="mt-2">
          {expertAppointments.map((appt) => (
            <li
              key={appt.id}
              className="p-2 border-b flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">{appt.user}</span> on{" "}
                  <span className="text-blue-500">{appt.date}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedAppointment(appt)}
                className="text-sm text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-700"
              >
                Reschedule
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedAppointment && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Reschedule Appointment</h3>
          <p>Current Date: {selectedAppointment.date}</p>
          <input
            type="date"
            className="border p-2 mt-2 w-full"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <button
            onClick={handleReschedule}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm New Date
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertDashboard;
