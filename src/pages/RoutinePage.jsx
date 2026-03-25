import { useState, useEffect } from 'react';
import './RoutinePage.css';

const routineItems = [
    { id: 'wake', icon: '🌅', label: 'Wake Up', time: 'morning' },
    { id: 'brush', icon: '🪥', label: 'Brush Teeth', time: 'morning' },
    { id: 'breakfast', icon: '🥣', label: 'Breakfast', time: 'morning' },
    { id: 'dress', icon: '👕', label: 'Get Dressed', time: 'morning' },
    { id: 'school', icon: '🏫', label: 'School', time: 'day' },
    { id: 'lunch', icon: '🍽️', label: 'Lunch', time: 'day' },
    { id: 'play', icon: '⚽', label: 'Play Time', time: 'afternoon' },
    { id: 'homework', icon: '📚', label: 'Homework', time: 'afternoon' },
    { id: 'dinner', icon: '🍝', label: 'Dinner', time: 'evening' },
    { id: 'bath', icon: '🛁', label: 'Bath', time: 'evening' },
    { id: 'stories', icon: '📖', label: 'Story Time', time: 'evening' },
    { id: 'sleep', icon: '😴', label: 'Sleep', time: 'night' },
];

const RoutinePage = () => {
    const [mode, setMode] = useState('view'); // view, practice, timer
    const [selectedRoutines, setSelectedRoutines] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [practiceComplete, setPracticeComplete] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(60);
    const [timerActive, setTimerActive] = useState(false);
    const [timerDuration, setTimerDuration] = useState(60);

    const toggleRoutineItem = (item) => {
        if (selectedRoutines.find(r => r.id === item.id)) {
            setSelectedRoutines(prev => prev.filter(r => r.id !== item.id));
        } else {
            setSelectedRoutines(prev => [...prev, item]);
        }
    };

    const startPractice = () => {
        if (selectedRoutines.length > 0) {
            setCurrentStep(0);
            setPracticeComplete(false);
            setMode('practice');
        }
    };

    const nextStep = () => {
        if (currentStep < selectedRoutines.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setPracticeComplete(true);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const startTimer = (seconds = 60) => {
        setTimerDuration(seconds);
        setTimerSeconds(seconds);
        setTimerActive(true);
        setMode('timer');
    };

    // Timer effect
    useEffect(() => {
        let interval;
        if (timerActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev - 1);
            }, 1000);
        } else if (timerSeconds === 0 && timerActive) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timerSeconds]);

    const renderView = () => (
        <div className="routine-view">
            <div className="routine-timeline">
                {['morning', 'day', 'afternoon', 'evening', 'night'].map(timeOfDay => (
                    <div key={timeOfDay} className="time-section">
                        <div className="time-indicator">
                            {timeOfDay === 'morning' && '🌅'}
                            {timeOfDay === 'day' && '☀️'}
                            {timeOfDay === 'afternoon' && '🌤️'}
                            {timeOfDay === 'evening' && '🌆'}
                            {timeOfDay === 'night' && '🌙'}
                        </div>
                        <div className="time-items">
                            {routineItems
                                .filter(item => item.time === timeOfDay)
                                .map((item, index) => (
                                    <button
                                        key={item.id}
                                        className={`routine-item ${selectedRoutines.find(r => r.id === item.id) ? 'selected' : ''}`}
                                        onClick={() => toggleRoutineItem(item)}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <span className="item-icon">{item.icon}</span>
                                        <span className="item-label">{item.label}</span>
                                        {selectedRoutines.find(r => r.id === item.id) && (
                                            <span className="item-check">✓</span>
                                        )}
                                    </button>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedRoutines.length > 0 && (
                <div className="routine-actions">
                    <button className="action-btn play-btn" onClick={startPractice}>
                        ▶️
                    </button>
                    <div className="selected-count">
                        {selectedRoutines.map(r => (
                            <span key={r.id} className="count-icon">{r.icon}</span>
                        ))}
                    </div>
                    <button className="action-btn clear-btn" onClick={() => setSelectedRoutines([])}>
                        ✕
                    </button>
                </div>
            )}
        </div>
    );

    const renderPractice = () => {
        const currentItem = selectedRoutines[currentStep];

        if (practiceComplete) {
            return (
                <div className="practice-complete">
                    <div className="complete-celebration">
                        <span className="celebration-star">⭐</span>
                        <div className="completed-items">
                            {selectedRoutines.map((r, i) => (
                                <span
                                    key={r.id}
                                    className="completed-icon"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    {r.icon}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className="done-btn" onClick={() => {
                        setMode('view');
                        setSelectedRoutines([]);
                    }}>
                        ✓
                    </button>
                </div>
            );
        }

        return (
            <div className="practice-view">
                <div className="progress-bar">
                    {selectedRoutines.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-step ${index < currentStep ? 'done' : ''} ${index === currentStep ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className="current-activity">
                    <button
                        className="nav-arrow prev-arrow"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
                    >
                        ←
                    </button>

                    <div className="activity-card">
                        <span className="activity-icon">{currentItem?.icon}</span>
                        <span className="activity-label">{currentItem?.label}</span>
                    </div>

                    <button
                        className="nav-arrow next-arrow"
                        onClick={nextStep}
                    >
                        {currentStep < selectedRoutines.length - 1 ? '→' : '✓'}
                    </button>
                </div>

                <div className="what-next">
                    {currentStep < selectedRoutines.length - 1 && (
                        <div className="next-preview">
                            <span className="next-label">→</span>
                            <span className="next-icon">
                                {selectedRoutines[currentStep + 1]?.icon}
                            </span>
                        </div>
                    )}
                </div>

                <div className="practice-controls">
                    <button className="timer-btn" onClick={() => startTimer(60)}>
                        ⏱️ 1m
                    </button>
                    <button className="timer-btn" onClick={() => startTimer(120)}>
                        ⏱️ 2m
                    </button>
                    <button className="timer-btn" onClick={() => startTimer(180)}>
                        ⏱️ 3m
                    </button>
                </div>

                <button className="back-btn" onClick={() => setMode('view')}>
                    ←
                </button>
            </div>
        );
    };

    const renderTimer = () => {
        const progress = timerDuration > 0 ? (timerSeconds / timerDuration) * 100 : 0;

        return (
            <div className="timer-view">
                <div className="timer-circle">
                    <svg className="timer-svg" viewBox="0 0 100 100">
                        <circle className="timer-bg" cx="50" cy="50" r="45" />
                        <circle
                            className="timer-progress"
                            cx="50"
                            cy="50"
                            r="45"
                            style={{ strokeDasharray: `${progress * 2.83} 283` }}
                        />
                    </svg>
                    <div className="timer-display">
                        <span className="timer-emoji">
                            {timerSeconds > 0 ? '⏳' : '✨'}
                        </span>
                        <span className="timer-number">{timerSeconds}</span>
                    </div>
                </div>

                <div className="timer-controls">
                    <button
                        className="timer-control-btn"
                        onClick={() => setTimerActive(!timerActive)}
                    >
                        {timerActive ? '⏸️' : '▶️'}
                    </button>
                    <button
                        className="timer-control-btn"
                        onClick={() => {
                            setTimerActive(false);
                            setMode('practice');
                        }}
                    >
                        ✓
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="routine-page">
            <header className="routine-header">
                <span className="page-icon">📅</span>
            </header>

            <main className="routine-content">
                {mode === 'view' && renderView()}
                {mode === 'practice' && renderPractice()}
                {mode === 'timer' && renderTimer()}
            </main>
        </div>
    );
};

export default RoutinePage;
