import React from 'react';
import './Progress.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faFire, faRunning } from '@fortawesome/free-solid-svg-icons';

const Progress = () => {
    const progressData = [
        {
            title: 'Workouts Completed',
            value: 35,
            icon: faFire,
            unit: 'workouts'
        },
        {
            title: 'Total Calories Burned',
            value: 12500,
            icon: faChartLine,
            unit: 'calories'
        },
        {
            title: 'Distance Run',
            value: 75,
            icon: faRunning,
            unit: 'km'
        }
    ];

    return (
        <div className="progress-container">
            <h2>Your Fitness Journey</h2>
            <div className="progress-grid">
                {progressData.map((item, index) => (
                    <div className="progress-card" key={index}>
                        <i className="progress-icon">
                            <FontAwesomeIcon icon={item.icon} />
                        </i>
                        <h3>{item.title}</h3>
                        <p className="progress-value">{item.value} {item.unit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Progress;