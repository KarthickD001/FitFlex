import React from 'react';
import './Wellness.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassWater, faBed, faLeaf, faHeart, faBullseye } from '@fortawesome/free-solid-svg-icons';

const Wellness = () => {
    const tips = [
        { text: 'Stay hydrated by drinking at least 8 glasses of water a day.', icon: faGlassWater },
        { text: 'Get at least 7-8 hours of quality sleep each night to recharge your body.', icon: faBed },
        { text: 'Incorporate mindfulness and meditation to reduce stress and improve focus.', icon: faLeaf },
        { text: 'Engage in regular physical activity such as walking, running, or cycling.', icon: faHeart },
        { text: 'Eat a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.', icon: faLeaf },
        { text: 'Practice gratitude daily by acknowledging the positive aspects of your life.', icon: faHeart },
        { text: 'Connect with loved ones and cultivate meaningful relationships.', icon: faHeart },
        { text: 'Take regular breaks from screens and digital devices to reduce eye strain and promote relaxation.', icon: faBed },
        { text: 'Try a new wellness activity each month, like yoga or hiking.', icon: faLeaf },
        { text: 'Set realistic goals for your wellness journey.', icon: faBullseye },
    ];

    return (
        <div className="wellness-container">
            <h2>Nourish Your Well-being</h2>
            <ul className="tip-list">
                {tips.map((tip, index) => (
                    <li key={index}>
                        <i className="tip-icon">
                            <FontAwesomeIcon icon={tip.icon} />
                        </i>
                        {tip.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wellness;