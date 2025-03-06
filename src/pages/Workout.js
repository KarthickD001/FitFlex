// Workout.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Workout = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get("https://exercisedb.p.rapidapi.com/exercises", {
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY", // **REPLACE WITH YOUR ACTUAL API KEY**
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    })
    .then(response => setExercises(response.data))
    .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Workout;