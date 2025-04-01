import React, { useState } from "react";
import { toast } from "react-toastify";

const BookingConfirmation = ({ expert, date, onConfirmPayment, onCancel, appointments = [] }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  const handlePayment = () => {
    if (!user.name || !user.email || !user.phone) {
      toast.error("Please fill in all details.");
      return;
    }

    const isDuplicate = appointments.some(
      (appt) => appt.expert === expert.name && appt.date === date && appt.email === user.email
    );

    if (isDuplicate) {
      toast.warning("You already have this appointment booked!");
      return;
    }

    const options = {
      key: "rzp_test_Om3GSKQumHFpy7",
      amount: 50000, // Amount in paise
      currency: "INR",
      name: "Appointment Booking",
      description: `Booking with ${expert.name} on ${date}`,
      handler: function (response) {
        toast.success("Payment Successful! ID: " + response.razorpay_payment_id);
        onConfirmPayment(user);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: { color: "#3399cc" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-700">Confirm Your Appointment</h2>
      <p className="mt-2 text-gray-600">
        You are booking an appointment with <strong>{expert.name}</strong> on <strong>{date}</strong>.
      </p>

      {/* User Details Input Fields */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 mb-2 border rounded"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-2 border rounded"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Pay & Confirm
        </button>
        <button
          onClick={() => {
            toast.warn("Appointment Cancelled");
            onCancel();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
