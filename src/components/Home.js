import React, { useState } from 'react';
import TimerModal from './TimerModal';
import './Home.css'; // Import CSS for styling

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutDetails, setWorkoutDetails] = useState({ name: '', duration: 0 });

  const loadTimerModal = (workoutName, duration) => {
    setWorkoutDetails({ name: workoutName, duration: duration });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const workouts = [
    { name: 'Rapid HIIT', duration: 600, icon: 'fas fa-fire', description: 'Unleash your cardio potential with this quick, calorie-crushing high intensity session.' },
    { name: 'Gentle Flow', duration: 900, icon: 'fas fa-spa', description: 'Melt away tension with a calming yoga journey. Perfect for relaxation and body alignment.' },
    { name: 'Full Body Burst', duration: 720, icon: 'fas fa-dumbbell', description: 'Ignite every muscle! Blast through this full body routine to sculpt and supercharge your strength.' },
    { name: 'Step It Up', duration: 660, icon: 'fas fa-shoe-prints', description: 'Elevate your energy with an invigorating step workout. Feel the burn and build stamina now!' },
    { name: 'Core Blast', duration: 780, icon: 'fas fa-heart', description: 'Strengthen and define your core with this effective routine. Unlock better posture and stability today!' },
    { name: 'Cycling Power', duration: 840, icon: 'fas fa-bicycle', description: 'Feel the rhythm and power through an exciting cycling workout. Build endurance and leg strength.' },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Unleash Your Inner Athlete</h1>
        <p>Achieve your fitness goals with personalized workout plans and expert guidance.</p>
        <button className="get-started-button">Get Started <i className="fas fa-arrow-right"></i></button>
      </section>

      <section className="quickie-section">
        <h2>Daily Quickie</h2>
        <p>Jumpstart your day with a 7-minute energizing workout!</p>
        <div className="quickie-details">
          <p><i className="fas fa-clock"></i> 7 Minutes</p>
          <p><i className="fas fa-bolt"></i> High Intensity</p>
        </div>
        <button className="start-button" onClick={() => loadTimerModal('Daily Quickie', 420)}>
          Begin <i className="fas fa-stopwatch"></i>
        </button>
      </section>

      <section className="workout-section">
        <h2>Explore Workouts</h2>
        <div className="workout-grid">
          {workouts.map((workout) => (
            <div key={workout.name} className="workout-card">
              <i className={`workout-icon ${workout.icon}`}></i>
              <h3>{workout.name}</h3>
              <p>{workout.description}</p>
              <button className="start-workout-button" onClick={() => loadTimerModal(workout.name, workout.duration)}>
                Start Workout <i className="fas fa-play"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <TimerModal
          isOpen={isModalOpen}
          onClose={closeModal}
          workoutName={workoutDetails.name}
          duration={workoutDetails.duration}
        />
      )}
    </div>
  );
};

export default Home;