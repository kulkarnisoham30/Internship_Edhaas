import React, { useState } from "react";
import experts from "../expertsData";

const ExpertsList = ({ onSelectExpert }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  // Get all unique specialties
  const specialties = [...new Set(experts.map(expert => expert.specialty))];

  // Filter experts based on selected specialty
  const filteredExperts = selectedSpecialty
    ? experts.filter(expert => expert.specialty === selectedSpecialty)
    : [];

  return (
    <div className="p-4">
      {!selectedSpecialty ? (
        // Show specialty selection
        <>
          <h2 className="text-2xl font-bold text-center text-gray-700">Select a Specialty</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {specialties.map((specialty, index) => (
              <button
                key={index}
                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </>
      ) : (
        // Show experts for selected specialty
        <>
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Experts in {selectedSpecialty}
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {filteredExperts.map(expert => (
              <button
                key={expert.id}
                className="p-3 border rounded-lg bg-gray-100 hover:bg-blue-300 transition"
                onClick={() => onSelectExpert(expert)}
              >
                {expert.name} - {expert.experience}
              </button>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
            onClick={() => setSelectedSpecialty(null)}
          >
            Back to Specialties
          </button>
        </>
      )}
    </div>
  );
};

export default ExpertsList;
