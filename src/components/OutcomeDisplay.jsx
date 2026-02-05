import { useEffect, useState } from 'react';
import './OutcomeDisplay.css';

const OutcomeDisplay = ({ isCorrect, onComplete }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isCorrect) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCorrect]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="outcome-display">
            <div className={`outcome-badge ${isCorrect ? 'correct' : 'try-again'}`}>
                <div className="outcome-icon">
                    {isCorrect ? '🌟' : '💭'}
                </div>
            </div>

            {showConfetti && (
                <div className="confetti-container">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti-piece"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                backgroundColor: ['#FFD700', '#7BC47F', '#6B9BD1', '#E8B86D', '#D4A5C9'][i % 5]
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OutcomeDisplay;
