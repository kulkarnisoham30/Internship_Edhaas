import React, { useState } from "react";
import ExpertsList from "./components/ExpertsList";
import ExpertCalendar from "./components/ExpertCalendar";
import BookingConfirmation from "./components/BookingConfirmation";
import ExpertDashboard from "./components/ExpertDashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/Main.css";

function App() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isExpertView, setIsExpertView] = useState(false);
  const [isBooking, setIsBooking] = useState(false); // 🔹 Track appointment booking

  // 🔹 Handle appointment booking
  const handleBookAppointment = (date) => {
    console.log("Booking appointment for:", date);  // ✅ Debugging log
    setSelectedDate(date);
    setIsBooking(true);
  };  

  // 🔹 Handle confirmed payment & save appointment
  const handleConfirmPayment = (userDetails) => {
    if (!selectedExpert || !selectedDate) {
      toast.error("Please select an expert and a date.");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      expert: selectedExpert.name,
      date: selectedDate,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
    };

    setAppointments([...appointments, newAppointment]);
    toast.success("Appointment Confirmed!");

    // Reset selections after booking
    setSelectedExpert(null);
    setSelectedDate(null);
    setIsBooking(false);
  };

  // 🔹 Handle going back to expert selection
  const handleGoBack = () => {
    setSelectedExpert(null);
    setSelectedDate(null);
    setIsBooking(false);
  };

  return (
    <div className="app-container">
      <ToastContainer position="top-right" autoClose={3000} className="toast-container" />

      <div className="card-container">
        <h1 className="header-title">Appointment Scheduler</h1>

        {/* Toggle between User View & Expert View */}
        <div className="view-toggle-buttons">
          <button
            onClick={() => setIsExpertView(false)}
            className={`toggle-button ${!isExpertView ? "active" : "inactive"}`}
          >
            User View
          </button>
          <button
            onClick={() => setIsExpertView(true)}
            className={`toggle-button ${isExpertView ? "active" : "inactive"}`}
          >
            Expert View
          </button>
        </div>

        {/* Conditional Rendering */}
        {isExpertView ? (
          <ExpertDashboard expert={selectedExpert || { name: "Select a Expert From User View First!" }} appointments={appointments} />
        ) : !selectedExpert ? (
          <ExpertsList onSelectExpert={setSelectedExpert} />
        ) : selectedDate ? (
          <BookingConfirmation
            expert={selectedExpert}
            date={selectedDate}
            appointments={appointments}
            onConfirmPayment={handleConfirmPayment}
            onCancel={handleGoBack}
          />
        ) : (
          <ExpertCalendar
          expert={selectedExpert} 
          appointments={appointments} 
          onBookAppointment={handleBookAppointment}
          onGoBack={handleGoBack} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
