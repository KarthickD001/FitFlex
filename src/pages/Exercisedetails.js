// Exercisedetails.js
import React from "react";
import { useParams } from "react-router-dom";

const ExerciseDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Exercise Details</h2>
      <p>Showing details for exercise ID: {id}</p>
    </div>
  );
};

export default ExerciseDetails;