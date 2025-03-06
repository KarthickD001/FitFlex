import React, { useState, useEffect, useCallback } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('events') || '{}');
        } catch (error) {
            console.error("Error parsing events from localStorage:", error);
            return {};
        }
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [calendarDays, setCalendarDays] = useState([]);

    const generateCalendar = useCallback((year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay();

        const daysArray = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            daysArray.push({ type: 'empty' });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const dateString = date.toLocaleDateString('en-US');

            daysArray.push({
                type: 'day',
                date: i,
                dateString: dateString,
                hasEvent: events.hasOwnProperty(dateString)
            });
        }

        setCalendarDays(daysArray);
    }, [events]);

    useEffect(() => {
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        localStorage.setItem('events', JSON.stringify(events));
    }, [currentDate, events, generateCalendar]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        if (day.type === 'day') {
            setSelectedDate(day.dateString);
            setEventTitle(events[day.dateString] || '');
        }
    };

    const handleAddEvent = () => {
        if (selectedDate) {
            const updatedEvents = { ...events, [selectedDate]: eventTitle };
            setEvents(updatedEvents);
            setSelectedDate(null);
            setEventTitle('');
        }
    };

    const handleDeleteEvent = (date) => {
        const updatedEvents = { ...events };
        delete updatedEvents[date];
        setEvents(updatedEvents);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <div className="calendar-navigation">
                    <button onClick={handlePrevMonth} aria-label="Previous Month">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={handleNextMonth} aria-label="Next Month">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            <div className="calendar-grid">
                {calendarDays.map((day, index) => (
                    day.type === 'day' ? (
                        <div
                            key={index}
                            className={`calendar-day ${day.hasEvent ? 'has-event' : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day.date}
                        </div>
                    ) : (
                        <div key={index} className="calendar-day empty"></div>
                    )
                ))}
            </div>

            {selectedDate && (
                <div className="event-form">
                    <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="Add workout"
                    />
                    <button onClick={handleAddEvent} aria-label="Add Event">
                        <FontAwesomeIcon icon={faPlus} /> Add
                    </button>
                    <button onClick={() => handleDeleteEvent(selectedDate)} aria-label="Delete Event">
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                </div>
            )}

            <div className="event-list">
                <h3>Workout History</h3>
                <ul>
                    {Object.entries(events).map(([date, title]) => (
                        <li key={date}>
                            {date}: {title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Calendar;