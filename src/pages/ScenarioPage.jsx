import { useState, useEffect, useCallback } from 'react';
import AnimationPlayer from '../components/AnimationPlayer';
import ChoiceSelector from '../components/ChoiceSelector';
import OutcomeDisplay from '../components/OutcomeDisplay';
import { getScenariosByLocation, getLocationById } from '../data/scenarios';
import { useSettings } from '../context/SettingsContext';
import './ScenarioPage.css';

const ScenarioPage = ({ locationId, onBack, customScenarios }) => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [phase, setPhase] = useState('intro'); // intro, playing, paused, completing, outcome, showing-correct, done
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showScenarioList, setShowScenarioList] = useState(true);
    const [correctChoice, setCorrectChoice] = useState(null);

    const { incrementScenarios, addSticker } = useSettings();

    const location = getLocationById(locationId);
    const allScenarios = [
        ...getScenariosByLocation(locationId),
        ...(customScenarios?.filter(s => s.locationId === locationId) || [])
    ];
    const currentScenario = allScenarios[currentScenarioIndex];

    const resetScenario = useCallback(() => {
        setPhase('intro');
        setSelectedChoice(null);
        setCorrectChoice(null);
    }, []);

    useEffect(() => {
        resetScenario();
    }, [currentScenarioIndex, resetScenario]);

    const handleScenarioSelect = (index) => {
        setCurrentScenarioIndex(index);
        setShowScenarioList(false);
        setPhase('playing');
    };

    const handlePauseComplete = () => {
        setPhase('paused');
    };

    const handleChoiceSelect = (choice) => {
        setSelectedChoice(choice);

        // Find the correct choice
        const correct = currentScenario?.choices?.find(c => c.isCorrect);
        setCorrectChoice(correct);

        setPhase('completing');
    };

    const handleAnimationComplete = () => {
        setPhase('outcome');
    };

    const handleOutcomeComplete = () => {
        // If wrong answer, show the correct answer first
        if (!selectedChoice?.isCorrect) {
            setPhase('showing-correct');
            // Auto-advance after showing correct answer
            setTimeout(() => {
                goToNextScenario();
            }, 2500);
        } else {
            // Correct answer - track progress and go to done
            incrementScenarios();
            addSticker(`scenario-${location?.id}`);
            setPhase('done');
        }
    };

    const goToNextScenario = () => {
        if (currentScenarioIndex < allScenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
            resetScenario();
            setTimeout(() => setPhase('playing'), 300);
        } else {
            setShowScenarioList(true);
            setCurrentScenarioIndex(0);
            resetScenario();
        }
    };

    const handlePlayAgain = () => {
        resetScenario();
        setPhase('playing');
    };

    const handleNextScenario = () => {
        goToNextScenario();
    };

    if (showScenarioList) {
        return (
            <div className="scenario-page" style={{ background: location?.bgGradient }}>
                <header className="scenario-header">
                    <button className="back-button" onClick={onBack}>
                        ←
                    </button>
                    <div className="location-badge">
                        <span>{location?.icon}</span>
                    </div>
                </header>

                <main className="scenario-list">
                    <div className="scenarios-grid">
                        {allScenarios.map((scenario, index) => (
                            <button
                                key={scenario.id}
                                className="scenario-card"
                                onClick={() => handleScenarioSelect(index)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="scenario-preview">
                                    {getScenarioIcon(scenario.animationType)}
                                </div>
                                <div className="scenario-info">
                                    <h3 className="scenario-title">{scenario.title}</h3>
                                    <p className="scenario-desc">{scenario.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="scenario-page" style={{ background: location?.bgGradient }}>
            <header className="scenario-header">
                <button className="back-button" onClick={() => setShowScenarioList(true)}>
                    ←
                </button>
                <div className="progress-dots">
                    {allScenarios.map((_, index) => (
                        <span
                            key={index}
                            className={`progress-dot ${index === currentScenarioIndex ? 'active' : ''} ${index < currentScenarioIndex ? 'done' : ''}`}
                        />
                    ))}
                </div>
            </header>

            <main className="scenario-main">
                <AnimationPlayer
                    scenario={currentScenario}
                    isPaused={phase === 'paused'}
                    isPlaying={phase === 'playing' || phase === 'completing'}
                    onPauseComplete={handlePauseComplete}
                    selectedChoice={selectedChoice}
                    onAnimationComplete={handleAnimationComplete}
                />

                {phase === 'paused' && (
                    <div className="choice-section">
                        <ChoiceSelector
                            choices={currentScenario?.choices}
                            onSelect={handleChoiceSelect}
                            selectedChoice={selectedChoice}
                            disabled={false}
                        />
                    </div>
                )}

                {phase === 'completing' && selectedChoice && (
                    <div className="choice-section">
                        <ChoiceSelector
                            choices={currentScenario?.choices}
                            onSelect={() => { }}
                            selectedChoice={selectedChoice}
                            correctChoice={correctChoice}
                            disabled={true}
                            showCorrect={true}
                        />
                    </div>
                )}

                {/* Show correct answer when user got it wrong */}
                {phase === 'showing-correct' && (
                    <div className="correct-answer-display">
                        <div className="correct-label">✓</div>
                        <div className="correct-choice">
                            <span className="correct-icon">{correctChoice?.icon}</span>
                        </div>
                        <div className="next-hint">→</div>
                    </div>
                )}

                {phase === 'done' && (
                    <div className="action-buttons">
                        <button className="btn btn-secondary" onClick={handlePlayAgain}>
                            🔄
                        </button>
                        <button className="btn btn-primary" onClick={handleNextScenario}>
                            ➡️
                        </button>
                    </div>
                )}
            </main>

            {phase === 'outcome' && (
                <OutcomeDisplay
                    isCorrect={selectedChoice?.isCorrect}
                    onComplete={handleOutcomeComplete}
                />
            )}
        </div>
    );
};

const getScenarioIcon = (animationType) => {
    const icons = {
        ball: '⚽',
        light: '💡',
        door: '🚪',
        swing: '🎪',
        slide: '🛝',
        faucet: '💧',
        bell: '🔔',
        eraser: '📝',
        pencil: '✏️',
        stethoscope: '🩺',
        thermometer: '🌡️',
        bandage: '🩹',
        cart: '🛒',
        scanner: '📱',
        bag: '👜',
        candle: '🕯️',
        balloon: '🎈',
        present: '🎁'
    };
    return <span className="scenario-icon">{icons[animationType] || '🎬'}</span>;
};

export default ScenarioPage;
