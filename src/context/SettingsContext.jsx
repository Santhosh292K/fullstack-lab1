import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        theme: 'calm-blue', // calm-blue, nature-green, sunset-warm
        reducedMotion: false,
        highContrast: false,
        soundEnabled: true,
        animationSpeed: 'normal', // slow, normal, fast
    });

    const [progress, setProgress] = useState({
        scenariosCompleted: 0,
        emotionsRecognized: 0,
        routinesCompleted: 0,
        stickersEarned: [],
        sessionsHistory: [],
        currentStreak: 0,
    });

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('controlPredict_settings');
        const savedProgress = localStorage.getItem('controlPredict_progress');

        if (savedSettings) {
            try {
                setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }

        if (savedProgress) {
            try {
                setProgress(prev => ({ ...prev, ...JSON.parse(savedProgress) }));
            } catch (e) {
                console.error('Failed to load progress:', e);
            }
        }
    }, []);

    // Save settings to localStorage
    useEffect(() => {
        localStorage.setItem('controlPredict_settings', JSON.stringify(settings));
    }, [settings]);

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem('controlPredict_progress', JSON.stringify(progress));
    }, [progress]);

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const incrementScenarios = () => {
        setProgress(prev => ({
            ...prev,
            scenariosCompleted: prev.scenariosCompleted + 1
        }));
    };

    const incrementEmotions = () => {
        setProgress(prev => ({
            ...prev,
            emotionsRecognized: prev.emotionsRecognized + 1
        }));
    };

    const addSticker = (stickerId) => {
        setProgress(prev => ({
            ...prev,
            stickersEarned: [...new Set([...prev.stickersEarned, stickerId])]
        }));
    };

    const addSessionHistory = (session) => {
        setProgress(prev => ({
            ...prev,
            sessionsHistory: [...prev.sessionsHistory.slice(-29), session]
        }));
    };

    const value = {
        settings,
        updateSettings,
        progress,
        incrementScenarios,
        incrementEmotions,
        addSticker,
        addSessionHistory,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;
