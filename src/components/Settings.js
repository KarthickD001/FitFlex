import React, { useState } from 'react';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faLock, faBullseye } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [calorieGoal, setCalorieGoal] = useState(localStorage.getItem('calorieGoal') || '');

    const handleSaveCalorieGoal = () => {
        localStorage.setItem('calorieGoal', calorieGoal);
        alert('Calorie goal saved!');
    };

    return (
        <div className="settings-container">
            <h2>Customize Your Experience</h2>

            <div className="setting-card">
                <i className="setting-icon">
                    <FontAwesomeIcon icon={faBell} />
                </i>
                <h3>Notification Preferences</h3>
                <p>Customize your workout reminders and motivational messages.</p>
                {/* Implement notification settings UI here */}
            </div>

            <div className="setting-card">
                <i className="setting-icon">
                    <FontAwesomeIcon icon={faLock} />
                </i>
                <h3>Privacy Settings</h3>
                <p>Control your data sharing and visibility within the app.</p>
                {/* Implement privacy settings UI here */}
            </div>

            <div className="setting-card">
                <i className="setting-icon">
                    <FontAwesomeIcon icon={faBullseye} />
                </i>
                <h3>Daily Calorie Goal</h3>
                <p>Set your daily calorie intake target.</p>
                <div className="setting-input-group">
                    <input
                        type="number"
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(e.target.value)}
                        placeholder="Enter your calorie goal"
                    />
                    <button onClick={handleSaveCalorieGoal}>Save Goal</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;