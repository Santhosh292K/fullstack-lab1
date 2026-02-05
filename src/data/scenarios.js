// Scenario data for Control & Predict app
// Each scenario has: id, location, animationType, choices, correctChoice

export const locations = [
    {
        id: 'home',
        name: 'Home',
        icon: '🏠',
        color: '#6B9BD1',
        bgGradient: 'linear-gradient(135deg, #E8F4F8 0%, #D4E8F4 100%)'
    },
    {
        id: 'park',
        name: 'Park',
        icon: '🌳',
        color: '#7BC47F',
        bgGradient: 'linear-gradient(135deg, #E8F8E8 0%, #D4F4D8 100%)'
    },
    {
        id: 'classroom',
        name: 'Classroom',
        icon: '📚',
        color: '#E8B86D',
        bgGradient: 'linear-gradient(135deg, #F8F0E6 0%, #F4E8D4 100%)'
    },
    {
        id: 'doctor',
        name: 'Doctor',
        icon: '🏥',
        color: '#9B8DC4',
        bgGradient: 'linear-gradient(135deg, #F0E6FF 0%, #E6D8F4 100%)'
    },
    {
        id: 'store',
        name: 'Store',
        icon: '🛒',
        color: '#6BBAB6',
        bgGradient: 'linear-gradient(135deg, #E6F8F6 0%, #D4F0EE 100%)'
    },
    {
        id: 'party',
        name: 'Party',
        icon: '🎂',
        color: '#D4A5C9',
        bgGradient: 'linear-gradient(135deg, #FFE6F5 0%, #F4D8EC 100%)'
    }
];

export const scenarios = [
    // HOME SCENARIOS
    {
        id: 'light-switch',
        locationId: 'home',
        animationType: 'light',
        title: 'Light Switch',
        description: 'What happens to the light?',
        choices: [
            { id: 'light-off', icon: '🌑', label: 'Goes dark', isCorrect: true },
            { id: 'light-on', icon: '💡', label: 'Stays bright', isCorrect: false },
            { id: 'light-flash', icon: '⚡', label: 'Flashes', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },
    {
        id: 'door-closing',
        locationId: 'home',
        animationType: 'door',
        title: 'Door Closing',
        description: 'What happens to the door?',
        choices: [
            { id: 'door-close', icon: '🚪', label: 'Closes fully', isCorrect: true },
            { id: 'door-open', icon: '🚪', label: 'Opens', isCorrect: false },
            { id: 'door-stay', icon: '🚪', label: 'Stays same', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2500
    },
    {
        id: 'faucet',
        locationId: 'home',
        animationType: 'faucet',
        title: 'Water Faucet',
        description: 'What happens to the water?',
        choices: [
            { id: 'water-flow', icon: '💧', label: 'Water flows', isCorrect: true },
            { id: 'water-stop', icon: '🚰', label: 'Water stops', isCorrect: false },
            { id: 'water-splash', icon: '💦', label: 'Water splashes', isCorrect: false }
        ],
        pausePoint: 40,
        duration: 2000
    },

    // PARK SCENARIOS
    {
        id: 'ball-rolling',
        locationId: 'park',
        animationType: 'ball',
        title: 'Rolling Ball',
        description: 'Where does the ball go?',
        choices: [
            { id: 'ball-forward', icon: '⚽', label: 'Rolls forward', isCorrect: true },
            { id: 'ball-back', icon: '🔙', label: 'Rolls back', isCorrect: false },
            { id: 'ball-stop', icon: '🛑', label: 'Stops', isCorrect: false }
        ],
        pausePoint: 45,
        duration: 3000
    },
    {
        id: 'swing',
        locationId: 'park',
        animationType: 'swing',
        title: 'Swing Moving',
        description: 'What does the swing do?',
        choices: [
            { id: 'swing-back', icon: '↔️', label: 'Swings back', isCorrect: true },
            { id: 'swing-stop', icon: '⏹️', label: 'Stops', isCorrect: false },
            { id: 'swing-spin', icon: '🔄', label: 'Spins', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2500
    },
    {
        id: 'slide',
        locationId: 'park',
        animationType: 'slide',
        title: 'Going Down Slide',
        description: 'What happens on the slide?',
        choices: [
            { id: 'slide-down', icon: '⬇️', label: 'Goes down', isCorrect: true },
            { id: 'slide-up', icon: '⬆️', label: 'Goes up', isCorrect: false },
            { id: 'slide-stay', icon: '🧍', label: 'Stays', isCorrect: false }
        ],
        pausePoint: 35,
        duration: 2000
    },

    // CLASSROOM SCENARIOS
    {
        id: 'bell-ring',
        locationId: 'classroom',
        animationType: 'bell',
        title: 'School Bell',
        description: 'What happens with the bell?',
        choices: [
            { id: 'bell-sound', icon: '🔔', label: 'Makes sound', isCorrect: true },
            { id: 'bell-quiet', icon: '🔕', label: 'Stays quiet', isCorrect: false },
            { id: 'bell-fall', icon: '📉', label: 'Falls down', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },
    {
        id: 'eraser-wipe',
        locationId: 'classroom',
        animationType: 'eraser',
        title: 'Eraser on Board',
        description: 'What happens to the writing?',
        choices: [
            { id: 'writing-gone', icon: '✨', label: 'Disappears', isCorrect: true },
            { id: 'writing-stay', icon: '📝', label: 'Stays there', isCorrect: false },
            { id: 'writing-more', icon: '✏️', label: 'Gets more', isCorrect: false }
        ],
        pausePoint: 40,
        duration: 2500
    },
    {
        id: 'pencil-drop',
        locationId: 'classroom',
        animationType: 'pencil',
        title: 'Falling Pencil',
        description: 'What happens to the pencil?',
        choices: [
            { id: 'pencil-floor', icon: '⬇️', label: 'Falls down', isCorrect: true },
            { id: 'pencil-float', icon: '🎈', label: 'Floats up', isCorrect: false },
            { id: 'pencil-stay', icon: '✏️', label: 'Stays there', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },

    // DOCTOR SCENARIOS
    {
        id: 'stethoscope',
        locationId: 'doctor',
        animationType: 'stethoscope',
        title: 'Listening Heart',
        description: 'What will the doctor hear?',
        choices: [
            { id: 'heartbeat', icon: '💓', label: 'Heartbeat', isCorrect: true },
            { id: 'silence', icon: '🔇', label: 'Nothing', isCorrect: false },
            { id: 'music', icon: '🎵', label: 'Music', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2500
    },
    {
        id: 'thermometer',
        locationId: 'doctor',
        animationType: 'thermometer',
        title: 'Taking Temperature',
        description: 'What shows on screen?',
        choices: [
            { id: 'number', icon: '🌡️', label: 'A number', isCorrect: true },
            { id: 'nothing', icon: '⬜', label: 'Blank', isCorrect: false },
            { id: 'colors', icon: '🌈', label: 'Colors', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },
    {
        id: 'bandage',
        locationId: 'doctor',
        animationType: 'bandage',
        title: 'Putting Bandage',
        description: 'What happens to the bandage?',
        choices: [
            { id: 'stick', icon: '🩹', label: 'Sticks on', isCorrect: true },
            { id: 'fall', icon: '⬇️', label: 'Falls off', isCorrect: false },
            { id: 'fly', icon: '🦋', label: 'Flies away', isCorrect: false }
        ],
        pausePoint: 45,
        duration: 2000
    },

    // STORE SCENARIOS
    {
        id: 'cart-push',
        locationId: 'store',
        animationType: 'cart',
        title: 'Shopping Cart',
        description: 'Where does the cart go?',
        choices: [
            { id: 'forward', icon: '➡️', label: 'Goes forward', isCorrect: true },
            { id: 'backward', icon: '⬅️', label: 'Goes back', isCorrect: false },
            { id: 'spin', icon: '🔄', label: 'Spins', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2500
    },
    {
        id: 'scanner',
        locationId: 'store',
        animationType: 'scanner',
        title: 'Scanning Item',
        description: 'What happens when scanned?',
        choices: [
            { id: 'beep', icon: '📢', label: 'Beeps', isCorrect: true },
            { id: 'quiet', icon: '🔇', label: 'Stays quiet', isCorrect: false },
            { id: 'explode', icon: '💥', label: 'Pops', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },
    {
        id: 'bag-fill',
        locationId: 'store',
        animationType: 'bag',
        title: 'Filling Bag',
        description: 'What happens to the bag?',
        choices: [
            { id: 'full', icon: '👜', label: 'Gets full', isCorrect: true },
            { id: 'empty', icon: '🛍️', label: 'Stays empty', isCorrect: false },
            { id: 'break', icon: '💔', label: 'Breaks', isCorrect: false }
        ],
        pausePoint: 45,
        duration: 2500
    },

    // PARTY SCENARIOS
    {
        id: 'candle-blow',
        locationId: 'party',
        animationType: 'candle',
        title: 'Birthday Candles',
        description: 'What happens to the flame?',
        choices: [
            { id: 'out', icon: '💨', label: 'Goes out', isCorrect: true },
            { id: 'bigger', icon: '🔥', label: 'Gets bigger', isCorrect: false },
            { id: 'stay', icon: '🕯️', label: 'Stays same', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },
    {
        id: 'balloon-pop',
        locationId: 'party',
        animationType: 'balloon',
        title: 'Balloon',
        description: 'What happens to the balloon?',
        choices: [
            { id: 'pop', icon: '💥', label: 'Pops', isCorrect: true },
            { id: 'float', icon: '🎈', label: 'Floats up', isCorrect: false },
            { id: 'shrink', icon: '⬇️', label: 'Shrinks', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2000
    },
    {
        id: 'present-open',
        locationId: 'party',
        animationType: 'present',
        title: 'Opening Gift',
        description: 'What is inside?',
        choices: [
            { id: 'toy', icon: '🧸', label: 'A toy', isCorrect: true },
            { id: 'nothing', icon: '📦', label: 'Empty', isCorrect: false },
            { id: 'animal', icon: '🐕', label: 'An animal', isCorrect: false }
        ],
        pausePoint: 50,
        duration: 2500
    }
];

export const getScenariosByLocation = (locationId) => {
    return scenarios.filter(s => s.locationId === locationId);
};

export const getLocationById = (locationId) => {
    return locations.find(l => l.id === locationId);
};

export const getScenarioById = (scenarioId) => {
    return scenarios.find(s => s.id === scenarioId);
};
