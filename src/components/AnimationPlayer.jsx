import { useState, useEffect, useCallback } from 'react';
import './AnimationPlayer.css';

const AnimationPlayer = ({
    scenario,
    isPaused,
    onPauseComplete,
    isPlaying,
    selectedChoice,
    onAnimationComplete
}) => {
    const [animationPhase, setAnimationPhase] = useState('initial');

    useEffect(() => {
        if (!scenario) return;

        if (animationPhase === 'initial' && isPlaying && !isPaused) {
            const pauseTimer = setTimeout(() => {
                setAnimationPhase('paused');
                onPauseComplete?.();
            }, scenario.duration * (scenario.pausePoint / 100));

            return () => clearTimeout(pauseTimer);
        }
    }, [scenario, isPlaying, isPaused, animationPhase, onPauseComplete]);

    useEffect(() => {
        if (selectedChoice && animationPhase === 'paused') {
            setAnimationPhase('completing');

            const completeTimer = setTimeout(() => {
                setAnimationPhase('complete');
                onAnimationComplete?.();
            }, scenario.duration * ((100 - scenario.pausePoint) / 100));

            return () => clearTimeout(completeTimer);
        }
    }, [selectedChoice, animationPhase, scenario, onAnimationComplete]);

    const resetAnimation = useCallback(() => {
        setAnimationPhase('initial');
    }, []);

    useEffect(() => {
        if (!isPlaying) {
            resetAnimation();
        }
    }, [isPlaying, resetAnimation]);

    const renderAnimation = () => {
        switch (scenario?.animationType) {
            case 'ball':
                return <BallAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'light':
                return <LightAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'door':
                return <DoorAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'swing':
                return <SwingAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'slide':
                return <SlideAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'faucet':
                return <FaucetAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'bell':
                return <BellAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'eraser':
                return <EraserAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'pencil':
                return <PencilAnimation phase={animationPhase} choice={selectedChoice} />;
            // Doctor scenarios
            case 'stethoscope':
                return <StethoscopeAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'thermometer':
                return <ThermometerAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'bandage':
                return <BandageAnimation phase={animationPhase} choice={selectedChoice} />;
            // Store scenarios
            case 'cart':
                return <CartAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'scanner':
                return <ScannerAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'bag':
                return <BagAnimation phase={animationPhase} choice={selectedChoice} />;
            // Party scenarios
            case 'candle':
                return <CandleAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'balloon':
                return <BalloonAnimation phase={animationPhase} choice={selectedChoice} />;
            case 'present':
                return <PresentAnimation phase={animationPhase} choice={selectedChoice} />;
            default:
                return <GenericAnimation phase={animationPhase} icon={getIconForType(scenario?.animationType)} />;
        }
    };

    return (
        <div className="animation-player">
            <div className="animation-stage">
                {renderAnimation()}
            </div>
            {animationPhase === 'paused' && (
                <div className="pause-indicator">
                    <div className="pause-icon">⏸️</div>
                </div>
            )}
        </div>
    );
};

const getIconForType = (type) => {
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
    return icons[type] || '🎬';
};

// Ball Animation
const BallAnimation = ({ phase, choice }) => {
    const getAnimationClass = () => {
        if (phase === 'initial') return 'ball-rolling';
        if (phase === 'paused') return 'ball-paused';
        if (phase === 'completing') return 'ball-rolling-complete';
        if (phase === 'complete') return 'ball-complete';
        return '';
    };

    return (
        <div className="ball-scene">
            <div className="grass"></div>
            <div className={`ball ${getAnimationClass()}`}>
                <div className="ball-pattern"></div>
            </div>
        </div>
    );
};

// Light Animation
const LightAnimation = ({ phase, choice }) => {
    const getLightClass = () => {
        if (phase === 'initial') return 'light-dimming';
        if (phase === 'paused') return 'light-paused';
        if (phase === 'completing') return 'light-turning-off';
        if (phase === 'complete') return 'light-off';
        return '';
    };

    return (
        <div className="light-scene">
            <div className="room">
                <div className="ceiling"></div>
                <div className={`light-fixture ${getLightClass()}`}>
                    <div className="light-bulb"></div>
                    <div className="light-glow"></div>
                </div>
                <div className="light-switch">
                    <div className="switch-plate">
                        <div className={`switch-toggle ${phase !== 'initial' ? 'switch-down' : 'switch-up'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Door Animation
const DoorAnimation = ({ phase, choice }) => {
    const getDoorClass = () => {
        if (phase === 'initial') return 'door-closing';
        if (phase === 'paused') return 'door-paused';
        if (phase === 'completing') return 'door-closing-complete';
        if (phase === 'complete') return 'door-closed';
        return '';
    };

    return (
        <div className="door-scene">
            <div className="wall">
                <div className="door-frame">
                    <div className={`door ${getDoorClass()}`}>
                        <div className="door-handle"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Swing Animation
const SwingAnimation = ({ phase }) => {
    const getSwingClass = () => {
        if (phase === 'initial') return 'swing-moving';
        if (phase === 'paused') return 'swing-paused';
        if (phase === 'completing') return 'swing-back';
        if (phase === 'complete') return 'swing-stopped';
        return '';
    };

    return (
        <div className="swing-scene">
            <div className="sky"></div>
            <div className="swing-set">
                <div className="swing-frame">
                    <div className="swing-bar"></div>
                    <div className={`swing ${getSwingClass()}`}>
                        <div className="swing-chain left"></div>
                        <div className="swing-chain right"></div>
                        <div className="swing-seat"></div>
                    </div>
                </div>
            </div>
            <div className="ground"></div>
        </div>
    );
};

// Slide Animation
const SlideAnimation = ({ phase }) => {
    const getSliderClass = () => {
        if (phase === 'initial') return 'slider-moving';
        if (phase === 'paused') return 'slider-paused';
        if (phase === 'completing') return 'slider-down';
        if (phase === 'complete') return 'slider-bottom';
        return '';
    };

    return (
        <div className="slide-scene">
            <div className="slide-structure">
                <div className="slide-ladder"></div>
                <div className="slide-ramp">
                    <div className={`slider ${getSliderClass()}`}>👧</div>
                </div>
            </div>
            <div className="slide-ground"></div>
        </div>
    );
};

// Faucet Animation
const FaucetAnimation = ({ phase }) => {
    const getWaterClass = () => {
        if (phase === 'initial') return 'water-starting';
        if (phase === 'paused') return 'water-paused';
        if (phase === 'completing') return 'water-flowing';
        if (phase === 'complete') return 'water-full';
        return '';
    };

    return (
        <div className="faucet-scene">
            <div className="sink">
                <div className="faucet">
                    <div className="faucet-spout"></div>
                    <div className="faucet-handle"></div>
                </div>
                <div className={`water ${getWaterClass()}`}></div>
                <div className="sink-bowl"></div>
            </div>
        </div>
    );
};

// Bell Animation
const BellAnimation = ({ phase, choice }) => {
    const getBellClass = () => {
        if (phase === 'initial') return 'bell-swinging';
        if (phase === 'paused') return 'bell-paused';
        if (phase === 'completing') return 'bell-ringing';
        if (phase === 'complete') return 'bell-still';
        return '';
    };

    return (
        <div className="bell-scene">
            <div className="bell-mount">
                <div className={`bell ${getBellClass()}`}>
                    <div className="bell-body">🔔</div>
                </div>
                {(phase === 'completing' || phase === 'complete') && (
                    <div className="sound-waves">
                        <div className="wave wave-1"></div>
                        <div className="wave wave-2"></div>
                        <div className="wave wave-3"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Eraser Animation
const EraserAnimation = ({ phase }) => {
    const getEraserClass = () => {
        if (phase === 'initial') return 'eraser-moving';
        if (phase === 'paused') return 'eraser-paused';
        if (phase === 'completing') return 'eraser-wiping';
        if (phase === 'complete') return 'eraser-done';
        return '';
    };

    const getWritingOpacity = () => {
        if (phase === 'complete') return 0;
        if (phase === 'completing') return 0.3;
        return 1;
    };

    return (
        <div className="eraser-scene">
            <div className="blackboard">
                <div className="board-frame">
                    <div className="board-surface">
                        <div className="writing" style={{ opacity: getWritingOpacity() }}>ABC</div>
                        <div className={`eraser ${getEraserClass()}`}>
                            <div className="eraser-body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Pencil Animation
const PencilAnimation = ({ phase }) => {
    const getPencilClass = () => {
        if (phase === 'initial') return 'pencil-falling';
        if (phase === 'paused') return 'pencil-paused';
        if (phase === 'completing') return 'pencil-dropping';
        if (phase === 'complete') return 'pencil-on-floor';
        return '';
    };

    return (
        <div className="pencil-scene">
            <div className="desk">
                <div className="desk-surface"></div>
                <div className={`pencil ${getPencilClass()}`}>✏️</div>
            </div>
            <div className="floor"></div>
        </div>
    );
};

// Doctor - Stethoscope Animation
const StethoscopeAnimation = ({ phase }) => (
    <div className="generic-scene doctor-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon ${phase === 'initial' ? 'animating' : ''} ${phase === 'completing' || phase === 'complete' ? 'complete-anim' : ''}`}>
            🩺
        </div>
        {(phase === 'completing' || phase === 'complete') && (
            <div className="effect-icon">💓</div>
        )}
    </div>
);

// Doctor - Thermometer Animation
const ThermometerAnimation = ({ phase }) => (
    <div className="generic-scene doctor-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon ${phase === 'initial' ? 'animating' : ''} ${phase === 'completing' || phase === 'complete' ? 'complete-anim' : ''}`}>
            🌡️
        </div>
        {(phase === 'completing' || phase === 'complete') && (
            <div className="effect-text">37°</div>
        )}
    </div>
);

// Doctor - Bandage Animation
const BandageAnimation = ({ phase }) => (
    <div className="generic-scene doctor-scene">
        <div className="scene-bg"></div>
        <div className="scene-element">🤕</div>
        <div className={`scene-icon bandage-icon ${phase === 'initial' ? 'animating moving-down' : ''} ${phase === 'completing' || phase === 'complete' ? 'complete-anim' : ''}`}>
            🩹
        </div>
    </div>
);

// Store - Cart Animation
const CartAnimation = ({ phase }) => (
    <div className="generic-scene store-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon ${phase === 'initial' ? 'animating moving-right' : ''} ${phase === 'completing' || phase === 'complete' ? 'complete-anim moved-right' : ''}`}>
            🛒
        </div>
    </div>
);

// Store - Scanner Animation
const ScannerAnimation = ({ phase }) => (
    <div className="generic-scene store-scene">
        <div className="scene-bg"></div>
        <div className="scene-element">📦</div>
        <div className={`scene-icon ${phase === 'initial' ? 'animating' : ''}`}>
            📱
        </div>
        {(phase === 'completing' || phase === 'complete') && (
            <div className="effect-icon beep">📢</div>
        )}
    </div>
);

// Store - Bag Animation
const BagAnimation = ({ phase }) => (
    <div className="generic-scene store-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon bag-icon ${phase === 'initial' ? 'animating' : ''} ${phase === 'completing' || phase === 'complete' ? 'bag-full' : ''}`}>
            {phase === 'complete' ? '🛍️' : '👜'}
        </div>
        {phase === 'initial' && <div className="falling-items">🍎</div>}
        {phase === 'completing' && <div className="falling-items">🥖</div>}
    </div>
);

// Party - Candle Animation
const CandleAnimation = ({ phase }) => (
    <div className="generic-scene party-scene">
        <div className="scene-bg"></div>
        <div className="scene-icon cake-icon">🎂</div>
        {phase !== 'complete' && (
            <div className={`flame ${phase === 'completing' ? 'blowing' : ''}`}>🔥</div>
        )}
        {phase === 'complete' && (
            <div className="effect-icon">💨</div>
        )}
    </div>
);

// Party - Balloon Animation
const BalloonAnimation = ({ phase }) => (
    <div className="generic-scene party-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon balloon-icon ${phase === 'initial' ? 'growing' : ''} ${phase === 'completing' ? 'popping' : ''}`}>
            {phase === 'complete' ? '💥' : '🎈'}
        </div>
        {phase === 'complete' && (
            <div className="confetti-mini">🎊</div>
        )}
    </div>
);

// Party - Present Animation
const PresentAnimation = ({ phase }) => (
    <div className="generic-scene party-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon present-icon ${phase === 'initial' ? 'shaking' : ''} ${phase === 'completing' ? 'opening' : ''}`}>
            {phase === 'complete' ? '🧸' : '🎁'}
        </div>
        {phase === 'complete' && (
            <div className="effect-icon sparkle">✨</div>
        )}
    </div>
);

// Generic Animation (fallback with icon)
const GenericAnimation = ({ phase, icon }) => (
    <div className="generic-scene">
        <div className="scene-bg"></div>
        <div className={`scene-icon ${phase === 'initial' ? 'animating' : ''} ${phase === 'completing' || phase === 'complete' ? 'complete-anim' : ''}`}>
            {icon}
        </div>
    </div>
);

export default AnimationPlayer;
