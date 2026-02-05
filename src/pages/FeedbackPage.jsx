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
            feedbackList: []
        };
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

    render() {
        const { formData, feedbackList } = this.state;

        return (
            <div className="feedback-page">
                <header className="feedback-header">
                    <h1>Feedback & Reflections</h1>
                    <p>Share your thoughts or keep a personal note about your day.</p>
                </header>

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
            </div>
        );
    }
}

export default FeedbackPage;
