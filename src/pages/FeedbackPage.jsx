import { Component } from 'react';
import './FeedbackPage.css';

class FeedbackPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                rating: '5',
                message: ''
            },
            feedbackList: [],
            showQuiz: false,
            quizAnswers: {},
            score: 0,
            quizSubmitted: false
        };

        this.quizQuestions = [
            {
                id: 1,
                question: "Which color represents 'Happy'?",
                options: [
                    { id: 'a', text: 'Blue 💙', correct: false },
                    { id: 'b', text: 'Yellow 💛', correct: true },
                    { id: 'c', text: 'Red ❤️', correct: false }
                ]
            },
            {
                id: 2,
                question: "What comes after 'Wake Up' in the morning routine?",
                options: [
                    { id: 'a', text: 'Brush Teeth 🪥', correct: true },
                    { id: 'b', text: 'Play Football ⚽', correct: false },
                    { id: 'c', text: 'Sleep 😴', correct: false }
                ]
            },
            {
                id: 3,
                question: "In the 'Doctor' scenario, what checks your heart?",
                options: [
                    { id: 'a', text: 'Bandage 🩹', correct: false },
                    { id: 'b', text: 'Thermometer 🌡️', correct: false },
                    { id: 'c', text: 'Stethoscope 🩺', correct: true }
                ]
            },
            {
                id: 4,
                question: "What happens to a balloon if you pop it?",
                options: [
                    { id: 'a', text: 'It floats away 🎈', correct: false },
                    { id: 'b', text: 'It goes BOOM! 💥', correct: true },
                    { id: 'c', text: 'It turns into a cake 🎂', correct: false }
                ]
            },
            {
                id: 5,
                question: "If you feel 'Angry', what can help?",
                options: [
                    { id: 'a', text: 'Yelling loudly 📢', correct: false },
                    { id: 'b', text: 'Breathing exercises 🌬️', correct: true },
                    { id: 'c', text: 'Breaking toys 💔', correct: false }
                ]
            }
        ];
    }

    componentDidMount() {
        const savedFeedback = localStorage.getItem('controlPredict_feedback');
        if (savedFeedback) {
            try {
                this.setState({ feedbackList: JSON.parse(savedFeedback) });
            } catch (e) {
                console.error('Failed to parse feedback:', e);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.feedbackList !== this.state.feedbackList) {
            localStorage.setItem('controlPredict_feedback', JSON.stringify(this.state.feedbackList));
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formData } = this.state;

        if (!formData.name.trim() || !formData.message.trim()) return;

        const newFeedback = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleDateString()
        };

        this.setState(prevState => ({
            feedbackList: [newFeedback, ...prevState.feedbackList],
            formData: {
                name: '',
                rating: '5',
                message: ''
            }
        }));
    };

    handleDelete = (id) => {
        this.setState(prevState => ({
            feedbackList: prevState.feedbackList.filter(item => item.id !== id)
        }));
    };

    // Quiz Methods
    toggleQuiz = (show) => {
        this.setState({ showQuiz: show });
    };

    handleQuizChange = (questionId, optionId) => {
        if (this.state.quizSubmitted) return;

        this.setState(prevState => ({
            quizAnswers: {
                ...prevState.quizAnswers,
                [questionId]: optionId
            }
        }));
    };

    handleQuizSubmit = () => {
        let score = 0;
        this.quizQuestions.forEach(q => {
            const selected = this.state.quizAnswers[q.id];
            const correct = q.options.find(o => o.correct)?.id;
            if (selected === correct) score++;
        });

        this.setState({
            score,
            quizSubmitted: true
        });
    };

    restartQuiz = () => {
        this.setState({
            quizAnswers: {},
            score: 0,
            quizSubmitted: false
        });
    };

    renderQuiz() {
        const { quizAnswers, quizSubmitted, score } = this.state;
        const allAnswered = this.quizQuestions.every(q => quizAnswers[q.id]);

        if (quizSubmitted) {
            return (
                <div className="quiz-results">
                    <div className="score-card">
                        <div className="score-circle">
                            <span className="score-number">{score}/{this.quizQuestions.length}</span>
                        </div>
                        <h3>
                            {score === this.quizQuestions.length ? '🌟 Perfect! 🌟' :
                                score > this.quizQuestions.length / 2 ? '👍 Good Job!' : 'keep practicing! 💪'}
                        </h3>
                        <p>You know a lot about emotions and routines!</p>
                        <button className="restart-btn" onClick={this.restartQuiz}>
                            Try Again 🔄
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="quiz-container">
                {this.quizQuestions.map((q, index) => (
                    <div key={q.id} className="quiz-question-card" style={{ animationDelay: `${index * 0.1}s` }}>
                        <h3 className="question-text">{index + 1}. {q.question}</h3>
                        <div className="quiz-options">
                            {q.options.map(opt => (
                                <button
                                    key={opt.id}
                                    className={`quiz-option ${quizAnswers[q.id] === opt.id ? 'selected' : ''}`}
                                    onClick={() => this.handleQuizChange(q.id, opt.id)}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="quiz-actions">
                    <button
                        className="submit-quiz-btn"
                        onClick={this.handleQuizSubmit}
                        disabled={!allAnswered}
                    >
                        Check Answers ✅
                    </button>
                </div>
            </div>
        );
    }

    render() {
        const { formData, feedbackList, showQuiz } = this.state;

        return (
            <div className="feedback-page">
                <header className="feedback-header">
                    <h1>Reflections & Quiz</h1>
                    <div className="mode-toggle">
                        <button
                            className={`toggle-btn ${!showQuiz ? 'active' : ''}`}
                            onClick={() => this.toggleQuiz(false)}
                        >
                            📝 Notes
                        </button>
                        <button
                            className={`toggle-btn ${showQuiz ? 'active' : ''}`}
                            onClick={() => this.toggleQuiz(true)}
                        >
                            🧠 Quiz
                        </button>
                    </div>
                </header>

                <main className="feedback-content">
                    {showQuiz ? this.renderQuiz() : (
                        <>
                            <div className="feedback-form-card">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name / Subject</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={this.handleChange}
                                            className="form-input"
                                            placeholder="What is this about?"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="rating">Mood / Rating</label>
                                        <select
                                            id="rating"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={this.handleChange}
                                            className="form-select"
                                        >
                                            <option value="5">🤩 Amazing</option>
                                            <option value="4">🙂 Good</option>
                                            <option value="3">😐 Okay</option>
                                            <option value="2">🙁 Not great</option>
                                            <option value="1">😤 Bad</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Your Thoughts</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={this.handleChange}
                                            className="form-textarea"
                                            placeholder="Write your thoughts here..."
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="submit-button">
                                        <span>💾 Save Note</span>
                                    </button>
                                </form>
                            </div>

                            <div className="feedback-list-section">
                                <h2 className="feedback-list-header">Previous Notes</h2>

                                <div className="feedback-list">
                                    {feedbackList.length === 0 ? (
                                        <div className="no-feedback">No notes yet. Add your first one above!</div>
                                    ) : (
                                        feedbackList.map(item => (
                                            <div key={item.id} className="feedback-item">
                                                <div className="feedback-item-header">
                                                    <span className="feedback-date">{item.date} by {item.name}</span>
                                                    <span className="feedback-rating">
                                                        {{
                                                            '5': '🤩',
                                                            '4': '🙂',
                                                            '3': '😐',
                                                            '2': '🙁',
                                                            '1': '😤'
                                                        }[item.rating]}
                                                    </span>
                                                </div>
                                                <div className="feedback-message">{item.message}</div>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => this.handleDelete(item.id)}
                                                >
                                                    Delete Note
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        );
    }
}

export default FeedbackPage;
