import { useState, useEffect, useCallback } from 'react';
import './CalmingCorner.css';

const scenes = [
    { id: 'rain', icon: '🌧️', name: 'Rain', bgClass: 'scene-rain' },
    { id: 'stars', icon: '✨', name: 'Stars', bgClass: 'scene-stars' },
    { id: 'ocean', icon: '🌊', name: 'Ocean', bgClass: 'scene-ocean' },
    { id: 'forest', icon: '🌲', name: 'Forest', bgClass: 'scene-forest' },
    { id: 'bubbles', icon: '🫧', name: 'Bubbles', bgClass: 'scene-bubbles' },
];

const CalmingCorner = () => {
    const [mode, setMode] = useState('menu'); // menu, scene, timer
    const [selectedScene, setSelectedScene] = useState(null);
    const [timerSeconds, setTimerSeconds] = useState(60);
    const [timerActive, setTimerActive] = useState(false);
    // Bug 1 fix: track the selected duration so progress bar calculates correctly
    const [timerDuration, setTimerDuration] = useState(60);
    const [squeezeScale, setSqueezeScale] = useState(1);

    // Timer logic
    useEffect(() => {
        let interval;
        if (timerActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(prev => prev - 1);
            }, 1000);
        } else if (timerSeconds === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timerSeconds]);

    const startScene = (scene) => {
        setSelectedScene(scene);
        setMode('scene');
    };

    // Bug 1 fix: also set timerDuration so progress is correct
    const startTimer = useCallback((seconds) => {
        setTimerDuration(seconds);
        setTimerSeconds(seconds);
        setTimerActive(true);
        setMode('timer');
    }, []);

    const handleSqueezeStart = () => setSqueezeScale(0.8);
    const handleSqueezeEnd = () => setSqueezeScale(1);

    const timerOptions = [
        { seconds: 30, label: '30s' },
        { seconds: 60, label: '1 min' },
        { seconds: 120, label: '2 min' },
    ];

    const renderMenu = () => (
        <div className="calming-menu">
            <div className="menu-section">
                <div className="scene-grid">
                    {scenes.map((scene, index) => (
                        <button
                            key={scene.id}
                            className="scene-card"
                            onClick={() => startScene(scene)}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="scene-emoji">{scene.icon}</span>
                            <span className="scene-name">{scene.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="menu-section">
                <div className="timer-options">
                    {timerOptions.map(({ seconds, label }) => (
                        <button
                            key={seconds}
                            className="timer-option"
                            onClick={() => startTimer(seconds)}
                        >
                            <span className="timer-icon">⏱️</span>
                            <span className="timer-option-label">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="menu-section">
                <button
                    className="squeeze-button"
                    onMouseDown={handleSqueezeStart}
                    onMouseUp={handleSqueezeEnd}
                    onMouseLeave={handleSqueezeEnd}
                    onTouchStart={handleSqueezeStart}
                    onTouchEnd={handleSqueezeEnd}
                    style={{ transform: `scale(${squeezeScale})` }}
                >
                    <span className="squeeze-emoji">🤗</span>
                    <div className="squeeze-ring"></div>
                </button>
            </div>
        </div>
    );

    const renderScene = () => (
        <div className={`scene-view ${selectedScene?.bgClass}`}>
            <div className="scene-elements">
                {selectedScene?.id === 'rain' && <RainScene />}
                {selectedScene?.id === 'stars' && <StarsScene />}
                {selectedScene?.id === 'ocean' && <OceanScene />}
                {selectedScene?.id === 'forest' && <ForestScene />}
                {selectedScene?.id === 'bubbles' && <BubblesScene />}
            </div>

            <button className="close-scene" onClick={() => setMode('menu')}>
                ✕
            </button>
        </div>
    );

    const renderTimer = () => {
        // Bug 1 fix: use timerDuration (not hardcoded 60) so progress is always correct
        const progress = timerDuration > 0 ? (timerSeconds / timerDuration) * 100 : 0;
        const minutes = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        const display = minutes > 0
            ? `${minutes}:${secs.toString().padStart(2, '0')}`
            : `${timerSeconds}`;

        return (
            <div className="timer-view">
                <div className="timer-circle">
                    <svg className="timer-svg" viewBox="0 0 100 100">
                        <circle
                            className="timer-bg"
                            cx="50"
                            cy="50"
                            r="45"
                        />
                        <circle
                            className="timer-progress"
                            cx="50"
                            cy="50"
                            r="45"
                            style={{
                                strokeDasharray: `${progress * 2.83} 283`,
                            }}
                        />
                    </svg>
                    <div className="timer-display">
                        <span className="timer-emoji">
                            {timerSeconds > 0 ? '⏳' : '⭐'}
                        </span>
                        <span className="timer-number">{display}</span>
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
                        onClick={() => setMode('menu')}
                    >
                        ✕
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="calming-corner">
            {mode === 'menu' && (
                <>
                    <header className="calming-header">
                        <span className="page-icon">🌊</span>
                    </header>
                    {renderMenu()}
                </>
            )}
            {mode === 'scene' && renderScene()}
            {mode === 'timer' && renderTimer()}
        </div>
    );
};

// Scene Components
const RainScene = () => (
    <div className="rain-container">
        {[...Array(50)].map((_, i) => (
            <div
                key={i}
                className="raindrop"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 2}s`
                }}
            />
        ))}
    </div>
);

const StarsScene = () => (
    <div className="stars-container">
        {[...Array(30)].map((_, i) => (
            <div
                key={i}
                className="star"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${1 + Math.random() * 2}s`,
                    animationDelay: `${Math.random() * 3}s`,
                    fontSize: `${0.5 + Math.random() * 1}rem`
                }}
            >
                ✨
            </div>
        ))}
    </div>
);

const OceanScene = () => (
    <div className="ocean-container">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
        <div className="fish">🐠</div>
        <div className="fish fish-2">🐟</div>
    </div>
);

const ForestScene = () => (
    <div className="forest-container">
        <div className="trees">
            {[...Array(8)].map((_, i) => (
                <span
                    key={i}
                    className="tree"
                    style={{
                        left: `${i * 12 + 5}%`,
                        fontSize: `${2 + Math.random() * 2}rem`,
                        animationDelay: `${i * 0.2}s`
                    }}
                >
                    🌲
                </span>
            ))}
        </div>
        <div className="butterfly">🦋</div>
        <div className="bird">🐦</div>
    </div>
);

const BubblesScene = () => (
    <div className="bubbles-container">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="bubble"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${3 + Math.random() * 4}s`,
                    animationDelay: `${Math.random() * 3}s`,
                    width: `${20 + Math.random() * 40}px`,
                    height: `${20 + Math.random() * 40}px`
                }}
            />
        ))}
    </div>
);

export default CalmingCorner;
