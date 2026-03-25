import { useState } from 'react';
import './SocialStories.css';

const stories = [
    {
        id: 'doctor',
        title: 'Going to the Doctor',
        icon: '🏥',
        color: '#6B9BD1',
        slides: [
            { icon: '🚗', description: 'We drive to the doctor' },
            { icon: '🏥', description: 'We go inside the building' },
            { icon: '🪑', description: 'We sit and wait' },
            { icon: '👨‍⚕️', description: 'The doctor comes to see us' },
            { icon: '👋', description: 'The doctor says hello' },
            { icon: '🩺', description: 'The doctor checks my body' },
            { icon: '⭐', description: 'All done! I did great!' },
        ]
    },
    {
        id: 'store',
        title: 'Going to the Store',
        icon: '🛒',
        color: '#7BC47F',
        slides: [
            { icon: '🚗', description: 'We drive to the store' },
            { icon: '🛒', description: 'We get a shopping cart' },
            { icon: '🍎', description: 'We pick food we need' },
            { icon: '💳', description: 'We pay at the counter' },
            { icon: '👜', description: 'We carry our bags' },
            { icon: '🏠', description: 'We go back home' },
            { icon: '⭐', description: 'Great shopping trip!' },
        ]
    },
    {
        id: 'friend',
        title: 'Meeting a Friend',
        icon: '👋',
        color: '#E8B86D',
        slides: [
            { icon: '👀', description: 'I see my friend' },
            { icon: '👋', description: 'I wave hello' },
            { icon: '😊', description: 'I smile at them' },
            { icon: '🗣️', description: 'We say hi' },
            { icon: '🎮', description: 'We play together' },
            { icon: '👋', description: 'We say goodbye' },
            { icon: '⭐', description: 'I made a connection!' },
        ]
    },
    {
        id: 'school',
        title: 'First Day of School',
        icon: '🏫',
        color: '#9B8DC4',
        slides: [
            { icon: '🌅', description: 'I wake up early' },
            { icon: '🎒', description: 'I pack my backpack' },
            { icon: '🚌', description: 'I take the bus' },
            { icon: '🏫', description: 'I arrive at school' },
            { icon: '👨‍🏫', description: 'I meet my teacher' },
            { icon: '🪑', description: 'I find my seat' },
            { icon: '⭐', description: 'I had a good day!' },
        ]
    },
    {
        id: 'birthday',
        title: 'Birthday Party',
        icon: '🎂',
        color: '#D4A5C9',
        slides: [
            { icon: '🎁', description: 'I bring a gift' },
            { icon: '🚪', description: 'I ring the doorbell' },
            { icon: '👋', description: 'I say happy birthday' },
            { icon: '🎈', description: 'There are balloons' },
            { icon: '🎂', description: 'We sing and eat cake' },
            { icon: '🎮', description: 'We play games' },
            { icon: '⭐', description: 'Party was fun!' },
        ]
    },
    {
        id: 'haircut',
        title: 'Getting a Haircut',
        icon: '💇',
        color: '#6BBAB6',
        slides: [
            { icon: '🏪', description: 'We go to the salon' },
            { icon: '🪑', description: 'I sit in a special chair' },
            { icon: '🧴', description: 'They put a cape on me' },
            { icon: '💧', description: 'They spray water on my hair' },
            { icon: '✂️', description: 'They cut my hair carefully' },
            { icon: '🪮', description: 'They brush my hair' },
            { icon: '⭐', description: 'I look great!' },
        ]
    },
];

const SocialStories = () => {
    const [selectedStory, setSelectedStory] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openStory = (story) => {
        setSelectedStory(story);
        setCurrentSlide(0);
    };

    const closeStory = () => {
        setSelectedStory(null);
        setCurrentSlide(0);
    };

    const nextSlide = () => {
        if (currentSlide < selectedStory.slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const renderStoryList = () => (
        <div className="stories-list">
            <div className="stories-grid">
                {stories.map((story, index) => (
                    <button
                        key={story.id}
                        className="story-card"
                        onClick={() => openStory(story)}
                        style={{
                            '--story-color': story.color,
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        <span className="story-icon">{story.icon}</span>
                        <span className="story-title">{story.title}</span>
                        <div className="story-preview">
                            {story.slides.slice(0, 3).map((slide, i) => (
                                <span key={i} className="preview-dot">{slide.icon}</span>
                            ))}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStoryViewer = () => {
        const slide = selectedStory.slides[currentSlide];
        const isLastSlide = currentSlide === selectedStory.slides.length - 1;
        const isFirstSlide = currentSlide === 0;

        return (
            <div
                className="story-viewer"
                style={{ '--story-color': selectedStory.color }}
            >
                <div className="story-progress">
                    {selectedStory.slides.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-dot ${index <= currentSlide ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className="slide-container">
                    <div className="slide-content" key={currentSlide}>
                        <div className="slide-icon-wrapper">
                            <span className="slide-icon">{slide.icon}</span>
                        </div>
                        <p className="slide-description">{slide.description}</p>
                    </div>
                </div>

                <div className="story-navigation">
                    <button
                        className={`nav-btn prev-btn ${isFirstSlide ? 'hidden' : ''}`}
                        onClick={prevSlide}
                        disabled={isFirstSlide}
                    >
                        ←
                    </button>

                    {isLastSlide ? (
                        <button className="nav-btn done-btn" onClick={closeStory}>
                            ✓
                        </button>
                    ) : (
                        <button className="nav-btn next-btn" onClick={nextSlide}>
                            →
                        </button>
                    )}
                </div>

                <button className="close-btn" onClick={closeStory}>
                    ✕
                </button>
            </div>
        );
    };

    return (
        <div className="social-stories">
            <header className="stories-header">
                <span className="page-icon">📖</span>
            </header>

            <main className="stories-content">
                {selectedStory ? renderStoryViewer() : renderStoryList()}
            </main>
        </div>
    );
};

export default SocialStories;
