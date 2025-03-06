document.addEventListener('DOMContentLoaded', function () {
    // Local Storage Keys
    const WORKOUT_DATA_KEY = 'workoutData';
    const EVENTS_KEY = 'events';
    const DARK_MODE_KEY = 'darkMode';

    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const daySelectors = document.querySelectorAll('.day-selector .day');
    const mainElement = document.querySelector('main');
    const contentWrapper = document.querySelector('.content-wrapper');
    const darkModeSwitch = document.createElement('div');
    darkModeSwitch.classList.add('dark-mode-switch');
    darkModeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeSwitch);

    let darkMode = localStorage.getItem(DARK_MODE_KEY) === 'enabled';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    darkModeSwitch.addEventListener('click', () => {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem(DARK_MODE_KEY, darkMode ? 'enabled' : 'disabled');
    });

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem(EVENTS_KEY) || '{}');
    let workoutData = JSON.parse(localStorage.getItem(WORKOUT_DATA_KEY) || '{"workoutsCompleted": 0,"caloriesBurned": 0,"minutesExercised": 0,"history": []}');

    // Function to save workout data to localStorage
    function saveWorkoutData() {
        localStorage.setItem(WORKOUT_DATA_KEY, JSON.stringify(workoutData));
    }

    // Function to save events to localStorage
    function saveEvents() {
        localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    }

    function loadContent(page) {
        contentWrapper.innerHTML = '';
        contentWrapper.style.display = 'flex';
        contentWrapper.style.flexDirection = 'column';
        contentWrapper.style.alignItems = 'center';

        switch (page) {
            case 'home':
                loadHomePage();
                break;
            case 'calendar':
                loadCalendarPage();
                break;
            case 'progress':
                loadProgressPage();
                break;
            case 'diet':
                loadDietPage();
                break;
            case 'wellness':
                loadWellnessPage();
                break;
            case 'settings':
                loadSettingsPage();
                break;
            default:
                loadHomePage();
                break;
        }
    }

    // Helper function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Function to update progress data
    function updateProgressData(duration, workoutName) {
        workoutData.workoutsCompleted++;
        workoutData.minutesExercised += duration / 60;
        workoutData.caloriesBurned += Math.round(duration / 60 * 7); // Rough estimate
        workoutData.history.push({
            name: workoutName,
            duration: duration / 60,
            calories: Math.round(duration / 60 * 7),
            date: new Date().toLocaleDateString()
        });
        saveWorkoutData();
    }

    //Function to load the Timer Modal
    function loadTimerModal(workoutName, duration) {
        // Create modal HTML
        const modalHTML = `
            <div class="modal" id="timerModal">
                <div class="modal-content">
                    <button class="close-button" onclick="closeModal()">×</button>
                    <h2>${workoutName}</h2>
                    <div class="timer-display" id="timerDisplay">00:00</div>
                    <div class="timer-buttons">
                        <button id="startTimer">Start</button>
                        <button id="pauseTimer">Pause</button>
                        <button id="resetTimer">Reset</button>
                    </div>
                </div>
            </div>
        `;

        // Append modal to the content wrapper
        contentWrapper.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal and timer elements
        const timerModal = document.getElementById('timerModal');
        const timerDisplay = document.getElementById('timerDisplay');
        const startTimerButton = document.getElementById('startTimer');
        const pauseTimerButton = document.getElementById('pauseTimer');
        const resetTimerButton = document.getElementById('resetTimer');

        let timeLeft = duration;
        let timerInterval;
        let timerRunning = false; // Added state to track if timer is running
        timerDisplay.textContent = formatTime(timeLeft); // Corrected formatting

        // Start Timer Function
        function startTimer() {
            if (!timerRunning) {
                timerRunning = true;
                timerInterval = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        timerDisplay.textContent = formatTime(timeLeft);
                    } else {
                        clearInterval(timerInterval);
                        timerDisplay.textContent = 'Workout Complete!';
                        updateProgressData(duration, workoutName);
                        timerModal.style.display = 'none';
                        resetTimer();
                        loadContent('progress');
                    }
                }, 1000);
            }
        }
        // Pause Timer Function
        function pauseTimer() {
            if (timerRunning) {
                timerRunning = false;
                clearInterval(timerInterval);
            }
        }

        // Reset Timer Function
        function resetTimer() {
            pauseTimer(); // Ensure timer is paused before resetting
            timeLeft = duration;
            timerDisplay.textContent = formatTime(timeLeft);
        }

        // Event listeners for timer buttons
        startTimerButton.addEventListener('click', startTimer);
        pauseTimerButton.addEventListener('click', pauseTimer);
        resetTimerButton.addEventListener('click', resetTimer);

        // Show the modal
        timerModal.style.display = 'block';

        //Make the Modal closeable
        window.closeModal = function () {
            timerModal.style.display = 'none';
            resetTimer(); // Reset timer when modal is closed
        };
    }

    // Home Page Function
    function loadHomePage() {
        contentWrapper.innerHTML = `
            <section class="challenge-section">
                <div class="content">
                    <h2>Daily Quickie</h2>
                    <p>Energize with a 7-minute workout: Jumping Jacks, Plank, Push-Ups, and Crunches. Go for 2 rounds!</p>
                    <button class="start-button" id="startDailyQuickie">Begin <i class="fas fa-stopwatch"></i></button>
                </div>
            </section>
            <section class="workout-section">
                <h2>Power-Packed Workouts</h2>
                <div class="workout-grid">
                    <div class="workout-card" data-workout="Rapid HIIT" data-duration="600">
                        <div class="details">
                            <h3><i class="fas fa-fire"></i> Rapid HIIT</h3>
                            <p>Unleash your cardio potential with this quick, calorie-crushing high intensity session.</p>
                        </div>
                        <button class="start-button start-workout">Start <i class="fas fa-play"></i></button>
                    </div>
                    <div class="workout-card" data-workout="Gentle Flow" data-duration="900">
                        <div class="details">
                            <h3><i class="fas fa-spa"></i> Gentle Flow</h3>
                            <p>Melt away tension with a calming yoga journey. Perfect for relaxation and body alignment.</p>
                        </div>
                        <button class="start-button start-workout">Start <i class="fas fa-play"></i></button>
                    </div>
                    <div class="workout-card" data-workout="Full Body Burst" data-duration="720">
                        <div class="details">
                            <h3><i class="fas fa-dumbbell"></i> Full Body Burst</h3>
                            <p>Ignite every muscle! Blast through this full body routine to sculpt and supercharge your strength.</p>
                        </div>
                        <button class="start-button start-workout">Start <i class="fas fa-play"></i></button>
                    </div>
                    <div class="workout-card" data-workout="Step It Up" data-duration="660">
                        <div class="details">
                            <h3><i class="fas fa-shoe-prints"></i> Step It Up</h3>
                            <p>Elevate your energy with an invigorating step workout. Feel the burn and build stamina now!</p>
                        </div>
                        <button class="start-button start-workout">Start <i class="fas fa-play"></i></button>
                    </div>
                    <div class="workout-card" data-workout="Core Blast" data-duration="780">
                        <div class="details">
                            <h3><i class="fas fa-heart"></i> Core Blast</h3>
                            <p>Strengthen and define your core with this effective routine. Unlock better posture and stability today!</p>
                        </div>
                        <button class="start-button start-workout">Start <i class="fas fa-play"></i></button>
                    </div>
                    <div class="workout-card" data-workout="Cycling Power" data-duration="840">
                        <div class="details">
                            <h3><i class="fas fa-bicycle"></i> Cycling Power</h3>
                            <p>Feel the rhythm and power through an exciting cycling workout. Build endurance and leg strength.</p>
                        </div>
                        <button class="start-button start-workout">Start <i class="fas fa-play"></i></button>
                    </div>
                </div>
            </section>
        `;

        // Attach event listeners after the content is loaded
        const startDailyQuickieButton = document.getElementById('startDailyQuickie');
        startDailyQuickieButton.addEventListener('click', () => {
            loadTimerModal('Daily Quickie', 420); // 7 minutes = 420 seconds
        });

        // Attach event listeners to workout cards
        const workoutCards = document.querySelectorAll('.workout-card');
        workoutCards.forEach(card => {
            const workoutName = card.dataset.workout;
            const workoutDuration = parseInt(card.dataset.duration, 10);
            const startButton = card.querySelector('.start-workout');

            startButton.addEventListener('click', () => {
                loadTimerModal(workoutName, workoutDuration);
            });
        });
    }

    // Progress Page Function
    function loadProgressPage() {
        contentWrapper.innerHTML = `
            <div class="progress-container">
                <div class="progress-header">
                    <h2>Track Your Gains</h2>
                </div>

                <div class="progress-stats">
                    <div class="stat-card">
                        <h3>Workouts Completed</h3>
                        <p id="workoutsCompleted">${workoutData.workoutsCompleted}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Calories Burned</h3>
                        <p id="caloriesBurned">${workoutData.caloriesBurned}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Minutes Exercised</h3>
                        <p id="minutesExercised">${workoutData.minutesExercised.toFixed(2)}</p>
                    </div>
                </div>

                <div class="chart-container">
                    <canvas id="workoutChart"></canvas>
                </div>
            </div>
        `;

        // Prepare data for the chart
        const chartData = prepareChartData();

        const workoutChartCanvas = document.getElementById('workoutChart');
        const workoutChart = new Chart(workoutChartCanvas, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Workout Duration (Minutes)',
                    data: chartData.duration,
                    backgroundColor: 'rgba(255, 235, 59, 0.2)',
                    borderColor: 'rgba(255, 235, 59, 1)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Calories Burned',
                    data: chartData.calories,
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value',
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.6)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                }
            }
        });

        // Helper function to prepare chart data
        function prepareChartData() {
            const labels = [];
            const duration = [];
            const calories = [];

            // Aggregate data by date (assuming history entries have a date property)
            const aggregatedData = {};
            workoutData.history.forEach(entry => {
                if (!aggregatedData[entry.date]) {
                    aggregatedData[entry.date] = { duration: 0, calories: 0 };
                }
                aggregatedData[entry.date].duration += entry.duration;
                aggregatedData[entry.date].calories += entry.calories;
            });

            // Populate arrays for chart
            for (const date in aggregatedData) {
                labels.push(date);
                duration.push(aggregatedData[date].duration);
                calories.push(aggregatedData[date].calories);
            }

            return { labels, duration, calories };
        }
    }

    // Diet Page Function
    function loadDietPage() {
        contentWrapper.innerHTML = `
            <div class="diet-container">
                <div class="diet-header">
                    <h2>Your Balanced Diet Plan</h2>
                </div>

                <div class="meal-plan">
                    <h3>Breakfast</h3>
                    <p class="meal-item">Oatmeal with Berries and Nuts <span class="calorie-count">350 Calories</span></p>
                    <a href="#" class="recipe-link">View Recipe</a>
                </div>

                <div class="meal-plan">
                    <h3>Lunch</h3>
                    <p class="meal-item">Grilled Chicken Salad with Mixed Greens <span class="calorie-count">450 Calories</span></p>
                    <a href="#" class="recipe-link">View Recipe</a>
                </div>

                <div class="meal-plan">
                    <h3>Dinner</h3>
                    <p class="meal-item">Baked Salmon with Roasted Vegetables <span class="calorie-count">500 Calories</span></p>
                    <a href="#" class="recipe-link">View Recipe</a>
                </div>

                <div class="total-calories">
                    Total Calories: 1300
                </div>
            </div>
        `;
    }

    // Calendar Page Function
    function loadCalendarPage() {
        contentWrapper.innerHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <h2 id="calendar-month-year"></h2>
                    <div class="calendar-navigation">
                        <button id="prev-month"><i class="fas fa-chevron-left"></i></button>
                        <button id="next-month"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
                <div class="calendar-grid" id="calendar-grid"></div>
                <div id="event-form" class="event-form">
                    <input type="text" id="event-title" placeholder="Add workout">
                    <button id="add-event">Add</button>
                </div>
                <div id="event-list">
                    <h3>Workout History</h3>
                    <ul id="event-list-ul"></ul>
                </div>
            </div>
        `;

        const calendarMonthYear = document.getElementById('calendar-month-year');
        const calendarGrid = document.getElementById('calendar-grid');
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');
        const eventForm = document.getElementById('event-form');
        const eventTitleInput = document.getElementById('event-title');
        const addEventButton = document.getElementById('add-event');
        const eventListUl = document.getElementById('event-list-ul');

        let selectedDate = null;

        function generateCalendar(year, month) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = firstDay.getDay();

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            calendarMonthYear.textContent = `${monthNames[month]} ${year}`;

            calendarGrid.innerHTML = '';

            const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            weekdays.forEach(weekday => {
                const dayLabel = document.createElement('div');
                dayLabel.classList.add('calendar-day', 'weekday-label');
                dayLabel.textContent = weekday;
                calendarGrid.appendChild(dayLabel);
            });

            for (let i = 0; i < startingDayOfWeek; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('calendar-day', 'inactive');
                calendarGrid.appendChild(emptyCell);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const calendarDay = document.createElement('div');
                calendarDay.classList.add('calendar-day');
                calendarDay.textContent = day;

                const dayOfWeek = (startingDayOfWeek + day - 1) % 7;
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    calendarDay.classList.add('weekend');
                }

                const dateKey = `${year}-${month + 1}-${day}`;
                if (events[dateKey]) {
                    const eventIndicator = document.createElement('div');
                    eventIndicator.classList.add('calendar-event');
                    calendarDay.appendChild(eventIndicator);
                }

                calendarDay.addEventListener('click', function () {
                    if (selectedDate) {
                        selectedDate.classList.remove('active');
                    }
                    selectedDate = this;
                    this.classList.add('active');
                    eventForm.style.display = 'block';
                    eventTitleInput.focus();

                    // Store date details on a clicked item
                    eventForm.setAttribute("data-year", year);
                    eventForm.setAttribute("data-month", month + 1);
                    eventForm.setAttribute("data-day", day);

                    displayEventsForDate(dateKey);  //Added to display event history onclick
                });

                if (year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate()) {
                    calendarDay.classList.add('active');
                    selectedDate = calendarDay; // Ensure selectedDate is set on initial load
                    const todayDateKey = `${year}-${month + 1}-${day}`;
                    displayEventsForDate(todayDateKey) // Added to display current history
                }

                calendarGrid.appendChild(calendarDay);
            }
        }

        function displayEventsForDate(dateKey) {
            eventListUl.innerHTML = ''; // Clear the list

            if (events[dateKey]) {
                events[dateKey].forEach(event => {
                    const li = document.createElement('li');
                    li.textContent = event;
                    eventListUl.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'No workouts added for this day.';
                eventListUl.appendChild(li);
            }
        }
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        prevMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            eventForm.style.display = 'none'; // Hide Event Form
        });

        nextMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            eventForm.style.display = 'none'; // Hide Event Form
        });

        addEventButton.addEventListener('click', () => {
            const eventTitle = eventTitleInput.value.trim();
            const year = eventForm.getAttribute("data-year");
            const month = eventForm.getAttribute("data-month");
            const day = eventForm.getAttribute("data-day");
            const dateKey = `${year}-${month}-${day}`;

            if (eventTitle && selectedDate) {
                if (!events[dateKey]) {
                    events[dateKey] = [];
                }
                events[dateKey].push(eventTitle);

                const eventIndicator = document.createElement('div');
                eventIndicator.classList.add('calendar-event');
                selectedDate.appendChild(eventIndicator);

                eventTitleInput.value = '';
                eventForm.style.display = 'none';

                displayEventsForDate(dateKey);  // Refresh the displayed list
                saveEvents();
            }
        });
    }

    // Wellness Page Function
    function loadWellnessPage() {
        contentWrapper.innerHTML = `
            <div class="wellness-container">
                <div class="wellness-header">
                    <h2>Wellness Tips for a Healthier You</h2>
                </div>
                <ul class="tip-list">
                    <li>Stay hydrated by drinking at least 8 glasses of water a day.</li>
                    <li>Get at least 7-8 hours of quality sleep each night to recharge your body.</li>
                    <li>Incorporate mindfulness and meditation to reduce stress and improve focus.</li>
                    <li>Engage in regular physical activity such as walking, running, or cycling.</li>
                    <li>Eat a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.</li>
                    <li>Practice gratitude daily by acknowledging the positive aspects of your life.</li>
                    <li>Connect with loved ones and cultivate meaningful relationships.</li>
                    <li>Take regular breaks from screens and digital devices to reduce eye strain and promote relaxation.</li>
                    <li>Try a new wellness activity each month, like yoga or hiking.</li>
                    <li>Set realistic goals for your wellness journey.</li>
                </ul>
            </div>
        `;
    }

    // Settings Page Function
    function loadSettingsPage() {
        contentWrapper.innerHTML = `
            <div class="settings-container">
                <div class="settings-header">
                    <h2>Customize Your FitMate Experience</h2>
                </div>
                <div class="setting-option">
                    <h3>Notification Preferences</h3>
                    <p>Manage your workout reminders and receive motivational messages.</p>
                    <!-- Implement notification settings UI here -->
                </div>
                <div class="setting-option">
                    <h3>Privacy Settings</h3>
                    <p>Control your data sharing and visibility within the app.</p>
                    <!-- Implement privacy settings UI here -->
                </div>
                 <div class="setting-option">
                    <h3>Daily Calorie Goal</h3>
                    <p>Set your daily calorie intake goal.</p>
                    <input type="number" id="calorieGoalInput" placeholder="Enter your goal">
                    <button id="saveCalorieGoal">Save</button>
                </div>
                <div class="setting-option">
                    <h3>App Theme</h3>
                    <p>Switch between different color schemes to personalize your experience.</p>
                    <button id="toggleDarkMode">Toggle Dark Mode</button>
                </div>
            </div>
        `;

        const calorieGoalInput = document.getElementById('calorieGoalInput');
        const saveCalorieGoalButton = document.getElementById('saveCalorieGoal');
        const toggleDarkModeButton = document.getElementById('toggleDarkMode');

        saveCalorieGoalButton.addEventListener('click', () => {
            const calorieGoal = parseInt(calorieGoalInput.value);
            if (!isNaN(calorieGoal)) {
                localStorage.setItem('calorieGoal', calorieGoal);
                alert('Calorie goal saved!');
            } else {
                alert('Please enter a valid number for your calorie goal.');
            }
        });
        toggleDarkModeButton.addEventListener('click', () => {
           darkModeSwitch.click();

        });
    }


    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            sidebarLinks.forEach(otherLink => otherLink.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('href').substring(1);
            loadContent(page);
        });
    });

    daySelectors.forEach(day => {
        day.addEventListener('click', function () {
            daySelectors.forEach(otherDay => otherDay.classList.remove('active'));
            this.classList.add('active');
        });
    });

    loadContent('home');
});