import './Navigation.css';

const Navigation = ({ currentView, onNavigate }) => {
    const navItems = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'routine', icon: '📅', label: 'Routine' },
        { id: 'emotions', icon: '😊', label: 'Emotions' },
        { id: 'calming', icon: '🌊', label: 'Calm' },
        { id: 'stories', icon: '📖', label: 'Stories' },
        { id: 'feedback', icon: '💭', label: 'Feedback' },
    ];

    return (
        <nav className="bottom-navigation">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                    aria-label={item.label}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-indicator"></span>
                </button>
            ))}
        </nav>
    );
};

export default Navigation;
