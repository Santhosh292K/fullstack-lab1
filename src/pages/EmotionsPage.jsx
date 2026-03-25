import { useState, useCallback, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import './EmotionsPage.css';

const emotions = [
    { id: 'happy', emoji: '😊', color: '#FFD93D', name: 'Happy' },
    { id: 'sad', emoji: '😢', color: '#6B9BD1', name: 'Sad' },
    { id: 'angry', emoji: '😠', color: '#FF6B6B', name: 'Angry' },
    { id: 'scared', emoji: '😨', color: '#9B8DC4', name: 'Scared' },
    { id: 'calm', emoji: '😌', color: '#7BC47F', name: 'Calm' },
    { id: 'excited', emoji: '🤩', color: '#E8B86D', name: 'Excited' },
    { id: 'tired', emoji: '😴', color: '#A0AEC0', name: 'Tired' },
    { id: 'surprised', emoji: '😲', color: '#D4A5C9', name: 'Surprised' },
];

const EmotionsPage = () => {
    const { incrementEmotions, addSticker } = useSettings();
    const [mode, setMode] = useState('menu'); // menu, match, selfcheck, breathing
    const [targetEmotion, setTargetEmotion] = useState(null);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [breathPhase, setBreathPhase] = useState('inhale');
    const [breathCount, setBreathCount] = useState(0);

    // Bug 3 fix: use a ref to cancel breathing cycle when navigating away
    const breathingAbort = useRef(false);

    const startMatchGame = useCallback(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setTargetEmotion(randomEmotion);
        setSelectedEmotion(null);
        setShowFeedback(false);
        setMode('match');
    }, []);

    const handleEmotionSelect = (emotion) => {
        if (showFeedback) return;

        setSelectedEmotion(emotion);
        setShowFeedback(true);

        if (emotion.id === targetEmotion?.id) {
            incrementEmotions();
            addSticker(`emotion-${emotion.id}`);
        }

        setTimeout(() => {
            startMatchGame();
        }, 2000);
    };

    const handleSelfCheck = (emotion) => {
        setSelectedEmotion(emotion);
        setTimeout(() => {
            setMode('menu');
            setSelectedEmotion(null);
        }, 2000);
    };

    const startBreathing = () => {
        breathingAbort.current = false;
        setMode('breathing');
        setBreathPhase('inhale');
        setBreathCount(0);
    };

    // Bug 3 fix: Effect-driven breathing cycle with abort support
    useEffect(() => {
        if (mode !== 'breathing') {
            breathingAbort.current = true;
            return;
        }

        breathingAbort.current = false;
        let count = 0;

        const cycle = () => {
            if (breathingAbort.current) return;
            if (count >= 3) {
                setMode('menu');
                return;
            }

            setBreathPhase('inhale');
            const t1 = setTimeout(() => {
                if (breathingAbort.current) return;
                setBreathPhase('hold');
                const t2 = setTimeout(() => {
                    if (breathingAbort.current) return;
                    setBreathPhase('exhale');
                    const t3 = setTimeout(() => {
                        if (breathingAbort.current) return;
                        count++;
                        setBreathCount(count);
                        cycle();
                    }, 4000);
                    return () => clearTimeout(t3);
                }, 2000);
                return () => clearTimeout(t2);
            }, 4000);
            return () => clearTimeout(t1);
        };

        cycle();

        return () => {
            breathingAbort.current = true;
        };
    }, [mode]);

    const renderMenu = () => (
        <div className="emotions-menu">
            <div className="menu-grid">
                <button
                    className="menu-card match-card"
                    onClick={startMatchGame}
                >
                    <span className="menu-icon">🎯</span>
                    <span className="menu-card-label">Match Emotions</span>
                    <span className="menu-dots">
                        {emotions.slice(0, 4).map(e => (
                            <span key={e.id} className="emotion-dot">{e.emoji}</span>
                        ))}
                    </span>
                </button>

                <button
                    className="menu-card selfcheck-card"
                    onClick={() => setMode('selfcheck')}
                >
                    <span className="menu-icon">💭</span>
                    <span className="menu-card-label">How Do I Feel?</span>
                    <span className="menu-subtitle">❓</span>
                </button>

                <button
                    className="menu-card breathing-card"
                    onClick={startBreathing}
                >
                    <span className="menu-icon">🌬️</span>
                    <span className="menu-card-label">Breathing</span>
                    <span className="breathing-indicator">
                        <span className="breath-circle"></span>
                    </span>
                </button>
            </div>
        </div>
    );

    const renderMatchGame = () => (
        <div className="match-game">
            <div className="target-emotion">
                <div
                    className="target-face"
                    style={{ backgroundColor: targetEmotion?.color }}
                >
                    <span className="target-emoji">{targetEmotion?.emoji}</span>
                </div>
                <div className="match-arrow">⬇️</div>
            </div>

            <div className="emotion-choices">
                {emotions.map((emotion) => (
                    <button
                        key={emotion.id}
                        className={`emotion-choice ${selectedEmotion?.id === emotion.id
                            ? emotion.id === targetEmotion?.id
                                ? 'correct'
                                : 'incorrect'
                            : ''
                            }`}
                        onClick={() => handleEmotionSelect(emotion)}
                        disabled={showFeedback}
                        style={{
                            '--emotion-color': emotion.color,
                            animationDelay: `${emotions.indexOf(emotion) * 0.05}s`
                        }}
                    >
                        <span className="choice-emoji">{emotion.emoji}</span>
                        <span className="choice-name">{emotion.name}</span>
                    </button>
                ))}
            </div>

            {showFeedback && (
                <div className="match-feedback">
                    {selectedEmotion?.id === targetEmotion?.id ? (
                        <span className="feedback-star">⭐</span>
                    ) : (
                        <span className="feedback-gentle">💙</span>
                    )}
                </div>
            )}

            <button className="back-btn" onClick={() => setMode('menu')}>
                ←
            </button>
        </div>
    );

    const renderSelfCheck = () => (
        <div className="self-check">
            <div className="selfcheck-header">
                <span className="selfcheck-icon">💭</span>
            </div>

            <div className="emotion-grid">
                {emotions.map((emotion) => (
                    <button
                        key={emotion.id}
                        className={`emotion-card ${selectedEmotion?.id === emotion.id ? 'selected' : ''}`}
                        onClick={() => handleSelfCheck(emotion)}
                        style={{
                            '--emotion-color': emotion.color,
                            animationDelay: `${emotions.indexOf(emotion) * 0.05}s`
                        }}
                    >
                        <span className="card-emoji">{emotion.emoji}</span>
                        <span className="card-name">{emotion.name}</span>
                    </button>
                ))}
            </div>

            {selectedEmotion && (
                <div className="selfcheck-response">
                    <span className="response-emoji">{selectedEmotion.emoji}</span>
                    <span className="response-heart">💙</span>
                </div>
            )}

            <button className="back-btn" onClick={() => setMode('menu')}>
                ←
            </button>
        </div>
    );

    const renderBreathing = () => (
        <div className="breathing-exercise">
            <div className="breath-container">
                <div className={`breath-circle-main ${breathPhase}`}>
                    <span className="breath-icon">
                        {breathPhase === 'inhale' && '🌬️'}
                        {breathPhase === 'hold' && '⏸️'}
                        {breathPhase === 'exhale' && '💨'}
                    </span>
                    <span className="breath-phase-label">
                        {breathPhase === 'inhale' && 'Breathe In'}
                        {breathPhase === 'hold' && 'Hold'}
                        {breathPhase === 'exhale' && 'Breathe Out'}
                    </span>
                </div>
            </div>

            <div className="breath-progress">
                {[1, 2, 3].map((num) => (
                    <span
                        key={num}
                        className={`breath-dot ${breathCount >= num ? 'complete' : ''}`}
                    >
                        ⭐
                    </span>
                ))}
            </div>

            <button className="back-btn" onClick={() => setMode('menu')}>
                ←
            </button>
        </div>
    );

    return (
        <div className="emotions-page">
            <header className="emotions-header">
                <span className="page-icon">😊</span>
            </header>

            <main className="emotions-content">
                {mode === 'menu' && renderMenu()}
                {mode === 'match' && renderMatchGame()}
                {mode === 'selfcheck' && renderSelfCheck()}
                {mode === 'breathing' && renderBreathing()}
            </main>
        </div>
    );
};

export default EmotionsPage;
