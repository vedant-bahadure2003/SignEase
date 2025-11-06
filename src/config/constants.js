// API Configuration
export const API_CONFIG = {
  BASE_URL: " https://signease-backend-1.onrender.com",
  ENDPOINTS: {
    PREDICT: "/predict",
  },
  PREDICTION_INTERVAL: 1000, // ms
};

// Camera Configuration
export const CAMERA_CONFIG = {
  VIDEO: {
    width: 640,
    height: 480,
  },
  CONSTRAINTS: {
    video: true,
  },
};

// Speech Synthesis Configuration
export const SPEECH_CONFIG = {
  DEFAULT_VOLUME: 1,
  DEFAULT_PITCH: 1,
  DEFAULT_RATE: 1,
  PITCH_MAPPING: {
    min: -10,
    max: 10,
    scale: 10,
  },
};

// UI Configuration
export const UI_CONFIG = {
  COLORS: {
    PRIMARY: "purple",
    SECONDARY: "gray",
    SUCCESS: "green",
    ERROR: "red",
  },
  BREAKPOINTS: {
    SM: "640px",
    MD: "768px",
    LG: "1024px",
  },
};
