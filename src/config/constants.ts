export const API_CONFIG = {
  GOOGLE_SHEETS_API_URL: process.env.VITE_GOOGLE_SHEETS_API_URL || 'YOUR_GOOGLE_SHEETS_API_URL',
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const AR_CONFIG = {
  MODEL_SCALE: '0.5 0.5 0.5',
  ROTATION_ANIMATION: 'property: rotation; to: -90 360 0; dur: 2000; easing: linear; loop: true',
};