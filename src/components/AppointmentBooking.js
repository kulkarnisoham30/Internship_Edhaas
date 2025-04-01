import React, { useState } from "react";
import ExpertsList from "./ExpertsList";
import ExpertCalendar from "./ExpertCalendar";

const AppointmentBooking = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);

  return (
    <div className="p-6">
      {selectedExpert ? (
        <ExpertCalendar
          expert={selectedExpert}
          appointments={[]} // Pass actual appointments here
          onBookAppointment={(slot) => alert(`Appointment booked for ${slot}`)} // Replace with actual booking logic
          onGoBack={() => setSelectedExpert(null)} // 🔥 This brings back the ExpertsList
        />
      ) : (
        <ExpertsList onSelectExpert={setSelectedExpert} />
      )}
    </div>
  );
};

export default AppointmentBooking;
