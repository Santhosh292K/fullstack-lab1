import { locations, getScenariosByLocation } from '../data/scenarios';
import './Home.css';

const Home = ({ onSelectLocation, onOpenParentMode, onOpenRewards, customScenarios }) => {
    return (
        <div className="home-page">
            <header className="home-header">
                <button
                    className="rewards-button"
                    onClick={onOpenRewards}
                    aria-label="Open rewards"
                >
                    🌟
                </button>
                <div className="logo">
                    <span className="logo-icon">🔁</span>
                </div>
                <button
                    className="parent-mode-button"
                    onClick={onOpenParentMode}
                    aria-label="Open parent settings"
                >
                    ⚙️
                </button>
            </header>

            <main className="home-main">
                <div className="locations-grid">
                    {locations.map((location, index) => {
                        const scenarioCount = getScenariosByLocation(location.id).length +
                            (customScenarios?.filter(s => s.locationId === location.id).length || 0);

                        return (
                            <button
                                key={location.id}
                                className="location-card"
                                onClick={() => onSelectLocation(location.id)}
                                style={{
                                    background: location.bgGradient,
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className="location-icon" style={{ color: location.color }}>
                                    {location.icon}
                                </div>
                                <div className="location-dots">
                                    {[...Array(Math.min(scenarioCount, 5))].map((_, i) => (
                                        <span
                                            key={i}
                                            className="dot"
                                            style={{ backgroundColor: location.color }}
                                        />
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Home;

