import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import './RewardSystem.css';

const allStickers = [
    // Emotion stickers
    { id: 'emotion-happy', emoji: '😊', category: 'emotions' },
    { id: 'emotion-sad', emoji: '😢', category: 'emotions' },
    { id: 'emotion-angry', emoji: '😠', category: 'emotions' },
    { id: 'emotion-scared', emoji: '😨', category: 'emotions' },
    { id: 'emotion-calm', emoji: '😌', category: 'emotions' },
    { id: 'emotion-excited', emoji: '🤩', category: 'emotions' },
    { id: 'emotion-tired', emoji: '😴', category: 'emotions' },
    { id: 'emotion-surprised', emoji: '😲', category: 'emotions' },

    // Scenario stickers
    { id: 'scenario-home', emoji: '🏠', category: 'scenarios' },
    { id: 'scenario-park', emoji: '🌳', category: 'scenarios' },
    { id: 'scenario-classroom', emoji: '📚', category: 'scenarios' },
    { id: 'scenario-ball', emoji: '⚽', category: 'scenarios' },
    { id: 'scenario-light', emoji: '💡', category: 'scenarios' },
    { id: 'scenario-door', emoji: '🚪', category: 'scenarios' },

    // Achievement stickers
    { id: 'achievement-star', emoji: '⭐', category: 'achievements' },
    { id: 'achievement-heart', emoji: '💜', category: 'achievements' },
    { id: 'achievement-rainbow', emoji: '🌈', category: 'achievements' },
    { id: 'achievement-trophy', emoji: '🏆', category: 'achievements' },
    { id: 'achievement-crown', emoji: '👑', category: 'achievements' },
    { id: 'achievement-fire', emoji: '🔥', category: 'achievements' },
];

const RewardSystem = ({ isOpen, onClose }) => {
    const { progress, addSticker } = useSettings();
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebrationSticker, setCelebrationSticker] = useState(null);

    const earnedStickers = allStickers.filter(s =>
        progress.stickersEarned.includes(s.id)
    );

    const lockedStickers = allStickers.filter(s =>
        !progress.stickersEarned.includes(s.id)
    );

    // Check for new sticker unlocks based on progress
    useEffect(() => {
        // Unlock achievements based on milestones
        if (progress.scenariosCompleted >= 5 && !progress.stickersEarned.includes('achievement-star')) {
            addSticker('achievement-star');
            setCelebrationSticker(allStickers.find(s => s.id === 'achievement-star'));
            setShowCelebration(true);
        }
        if (progress.scenariosCompleted >= 10 && !progress.stickersEarned.includes('achievement-trophy')) {
            addSticker('achievement-trophy');
        }
        if (progress.emotionsRecognized >= 5 && !progress.stickersEarned.includes('achievement-heart')) {
            addSticker('achievement-heart');
        }
        if (earnedStickers.length >= 10 && !progress.stickersEarned.includes('achievement-rainbow')) {
            addSticker('achievement-rainbow');
        }
    }, [progress, addSticker, earnedStickers.length]);

    if (!isOpen) return null;

    return (
        <div className="reward-overlay">
            <div className="reward-panel">
                <div className="reward-header">
                    <span className="reward-icon">🌟</span>
                    <button className="close-rewards" onClick={onClose}>✕</button>
                </div>

                <div className="sticker-section">
                    <div className="sticker-count">
                        <span className="count-number">{earnedStickers.length}</span>
                        <span className="count-total">/ {allStickers.length}</span>
                    </div>

                    <div className="stickers-grid">
                        {earnedStickers.map((sticker, index) => (
                            <div
                                key={sticker.id}
                                className="sticker earned"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <span className="sticker-emoji">{sticker.emoji}</span>
                            </div>
                        ))}
                        {lockedStickers.map((sticker) => (
                            <div key={sticker.id} className="sticker locked">
                                <span className="sticker-emoji">❓</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-section">
                    <div className="progress-item">
                        <span className="progress-icon">🎯</span>
                        <span className="progress-value">{progress.scenariosCompleted}</span>
                    </div>
                    <div className="progress-item">
                        <span className="progress-icon">😊</span>
                        <span className="progress-value">{progress.emotionsRecognized}</span>
                    </div>
                </div>
            </div>

            {showCelebration && celebrationSticker && (
                <div
                    className="celebration-overlay"
                    onClick={() => setShowCelebration(false)}
                >
                    <div className="celebration-content">
                        <div className="celebration-sticker">
                            <span>{celebrationSticker.emoji}</span>
                        </div>
                        <div className="celebration-confetti">
                            {[...Array(20)].map((_, i) => (
                                <span
                                    key={i}
                                    className="confetti-piece"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 0.5}s`,
                                        backgroundColor: ['#FFD700', '#7BC47F', '#6B9BD1', '#E8B86D', '#D4A5C9'][i % 5]
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RewardSystem;
