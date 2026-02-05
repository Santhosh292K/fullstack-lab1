import { useState, useEffect } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import Home from './pages/Home';
import ScenarioPage from './pages/ScenarioPage';
import EmotionsPage from './pages/EmotionsPage';
import CalmingCorner from './pages/CalmingCorner';
import RoutinePage from './pages/RoutinePage';
import SocialStories from './pages/SocialStories';
import FeedbackPage from './pages/FeedbackPage';
import ParentMode from './components/ParentMode';
import Navigation from './components/Navigation';
import RewardSystem from './components/RewardSystem';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isParentModeOpen, setIsParentModeOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [customScenarios, setCustomScenarios] = useState([]);

  // Load custom scenarios from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('controlPredict_customScenarios');
    if (saved) {
      try {
        setCustomScenarios(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom scenarios:', e);
      }
    }
  }, []);

  // Save custom scenarios to localStorage
  useEffect(() => {
    localStorage.setItem('controlPredict_customScenarios', JSON.stringify(customScenarios));
  }, [customScenarios]);

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedLocation(null);
  };

  const handleSelectLocation = (locationId) => {
    setSelectedLocation(locationId);
    setCurrentView('scenario');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedLocation(null);
  };

  const handleAddCustomScenario = (scenario) => {
    setCustomScenarios(prev => [...prev, scenario]);
  };

  const handleDeleteCustomScenario = (scenarioId) => {
    setCustomScenarios(prev => prev.filter(s => s.id !== scenarioId));
  };

  // Determine if we should show bottom navigation
  const showNavigation = ['home', 'routine', 'emotions', 'calming', 'stories', 'feedback'].includes(currentView);

  return (
    <SettingsProvider>
      <div className="app">
        {/* Home Page */}
        {currentView === 'home' && (
          <Home
            onSelectLocation={handleSelectLocation}
            onOpenParentMode={() => setIsParentModeOpen(true)}
            onOpenRewards={() => setIsRewardsOpen(true)}
            customScenarios={customScenarios}
          />
        )}

        {/* Scenario Player */}
        {currentView === 'scenario' && selectedLocation && (
          <ScenarioPage
            locationId={selectedLocation}
            onBack={handleBackToHome}
            customScenarios={customScenarios}
          />
        )}

        {/* Emotions Page */}
        {currentView === 'emotions' && (
          <EmotionsPage />
        )}

        {/* Calming Corner */}
        {currentView === 'calming' && (
          <CalmingCorner />
        )}

        {/* Routine Page */}
        {currentView === 'routine' && (
          <RoutinePage />
        )}

        {/* Social Stories */}
        {currentView === 'stories' && (
          <SocialStories />
        )}

        {/* Feedback Page */}
        {currentView === 'feedback' && (
          <FeedbackPage />
        )}

        {/* Bottom Navigation */}
        {showNavigation && (
          <Navigation
            currentView={currentView}
            onNavigate={handleNavigate}
          />
        )}

        {/* Parent Mode Modal */}
        <ParentMode
          isOpen={isParentModeOpen}
          onClose={() => setIsParentModeOpen(false)}
          customScenarios={customScenarios}
          onAddScenario={handleAddCustomScenario}
          onDeleteScenario={handleDeleteCustomScenario}
        />

        {/* Rewards Modal */}
        <RewardSystem
          isOpen={isRewardsOpen}
          onClose={() => setIsRewardsOpen(false)}
        />
      </div>
    </SettingsProvider>
  );
}

export default App;
