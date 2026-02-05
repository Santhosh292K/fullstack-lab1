import './ChoiceSelector.css';

const ChoiceSelector = ({ choices, onSelect, selectedChoice, correctChoice, disabled, showCorrect }) => {
    const handleSelect = (choice) => {
        if (!disabled && !selectedChoice) {
            onSelect(choice);
        }
    };

    return (
        <div className="choice-selector">
            <div className="choices-container">
                {choices?.map((choice, index) => {
                    // Determine if this is the correct answer to highlight
                    const isSelected = selectedChoice?.id === choice.id;
                    const isCorrectAnswer = choice.isCorrect;
                    const shouldHighlightCorrect = showCorrect && isCorrectAnswer && !isSelected;

                    let cardClass = 'choice-card';
                    if (isSelected) {
                        cardClass += isCorrectAnswer ? ' selected correct' : ' selected incorrect';
                    }
                    if (shouldHighlightCorrect) {
                        cardClass += ' show-correct';
                    }
                    if (disabled) {
                        cardClass += ' disabled';
                    }

                    return (
                        <button
                            key={choice.id}
                            className={cardClass}
                            onClick={() => handleSelect(choice)}
                            disabled={disabled || selectedChoice}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                            aria-label={choice.label}
                        >
                            <div className="choice-icon">
                                {choice.icon}
                            </div>
                            {isSelected && (
                                <div className="choice-feedback">
                                    {isCorrectAnswer ? (
                                        <div className="feedback-correct">✓</div>
                                    ) : (
                                        <div className="feedback-incorrect">✗</div>
                                    )}
                                </div>
                            )}
                            {shouldHighlightCorrect && (
                                <div className="choice-feedback">
                                    <div className="feedback-correct show">✓</div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ChoiceSelector;
