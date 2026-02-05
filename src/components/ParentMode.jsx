import { useState, useEffect } from 'react';
import './ParentMode.css';

const ParentMode = ({
    isOpen,
    onClose,
    customScenarios,
    onAddScenario,
    onDeleteScenario
}) => {
    const [holdProgress, setHoldProgress] = useState(0);
    const [isExitHolding, setIsExitHolding] = useState(false);
    const [activeTab, setActiveTab] = useState('scenarios');

    // New scenario form state
    const [newScenario, setNewScenario] = useState({
        title: '',
        locationId: 'home',
        animationType: 'ball'
    });

    useEffect(() => {
        let interval;
        if (isExitHolding) {
            interval = setInterval(() => {
                setHoldProgress(prev => {
                    if (prev >= 100) {
                        onClose();
                        return 0;
                    }
                    return prev + 5;
                });
            }, 50);
        } else {
            setHoldProgress(0);
        }
        return () => clearInterval(interval);
    }, [isExitHolding, onClose]);

    const handleAddScenario = () => {
        if (newScenario.title.trim()) {
            const scenario = {
                id: `custom-${Date.now()}`,
                ...newScenario,
                description: 'Custom scenario',
                choices: [
                    { id: 'choice-1', icon: '✓', label: 'This happens', isCorrect: true },
                    { id: 'choice-2', icon: '✗', label: 'Not this', isCorrect: false },
                    { id: 'choice-3', icon: '?', label: 'Or this', isCorrect: false }
                ],
                pausePoint: 50,
                duration: 2000
            };
            onAddScenario(scenario);
            setNewScenario({ title: '', locationId: 'home', animationType: 'ball' });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="parent-mode-overlay">
            <div className="parent-mode-panel">
                <div className="parent-header">
                    <h2>👨‍👩‍👧 Parent Settings</h2>
                    <button
                        className="exit-button"
                        onMouseDown={() => setIsExitHolding(true)}
                        onMouseUp={() => setIsExitHolding(false)}
                        onMouseLeave={() => setIsExitHolding(false)}
                        onTouchStart={() => setIsExitHolding(true)}
                        onTouchEnd={() => setIsExitHolding(false)}
                    >
                        <span>Hold to Exit</span>
                        <div
                            className="exit-progress"
                            style={{ width: `${holdProgress}%` }}
                        />
                    </button>
                </div>

                <div className="parent-tabs">
                    <button
                        className={`tab ${activeTab === 'scenarios' ? 'active' : ''}`}
                        onClick={() => setActiveTab('scenarios')}
                    >
                        📝 Scenarios
                    </button>
                    <button
                        className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => setActiveTab('info')}
                    >
                        ℹ️ About
                    </button>
                </div>

                <div className="parent-content">
                    {activeTab === 'scenarios' && (
                        <div className="scenarios-tab">
                            <div className="add-scenario-form">
                                <h3>Add Custom Scenario</h3>
                                <div className="form-group">
                                    <label>Scenario Name</label>
                                    <input
                                        type="text"
                                        value={newScenario.title}
                                        onChange={(e) => setNewScenario({ ...newScenario, title: e.target.value })}
                                        placeholder="e.g., Turning on TV"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <select
                                        value={newScenario.locationId}
                                        onChange={(e) => setNewScenario({ ...newScenario, locationId: e.target.value })}
                                    >
                                        <option value="home">🏠 Home</option>
                                        <option value="park">🌳 Park</option>
                                        <option value="classroom">📚 Classroom</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Animation Type</label>
                                    <select
                                        value={newScenario.animationType}
                                        onChange={(e) => setNewScenario({ ...newScenario, animationType: e.target.value })}
                                    >
                                        <option value="ball">⚽ Ball</option>
                                        <option value="light">💡 Light</option>
                                        <option value="door">🚪 Door</option>
                                        <option value="swing">🎪 Swing</option>
                                        <option value="faucet">💧 Faucet</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary" onClick={handleAddScenario}>
                                    + Add Scenario
                                </button>
                            </div>

                            {customScenarios?.length > 0 && (
                                <div className="custom-scenarios-list">
                                    <h3>Your Custom Scenarios</h3>
                                    {customScenarios.map(scenario => (
                                        <div key={scenario.id} className="custom-scenario-item">
                                            <span>{scenario.title}</span>
                                            <button
                                                className="delete-btn"
                                                onClick={() => onDeleteScenario(scenario.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'info' && (
                        <div className="info-tab">
                            <h3>About Control & Predict</h3>
                            <p>
                                This app helps children learn to predict outcomes through
                                simple animations. The pause → predict → play flow builds
                                confidence and reduces anxiety about what happens next.
                            </p>
                            <h4>How to Use</h4>
                            <ul>
                                <li>Select a location (Home, Park, or Classroom)</li>
                                <li>Watch the animation begin</li>
                                <li>When it pauses, choose what happens next</li>
                                <li>Watch the animation complete</li>
                            </ul>
                            <h4>Tips</h4>
                            <ul>
                                <li>There are no scores or time limits</li>
                                <li>Every choice leads to a gentle response</li>
                                <li>Repeat scenarios as many times as needed</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentMode;
