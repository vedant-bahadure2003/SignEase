/**
 * Utility functions for the SignEase application
 */

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit the rate of function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to wait between calls
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Check if the browser supports required features
 * @returns {Object} - Object containing support flags
 */
export const checkBrowserSupport = () => {
  return {
    getUserMedia: !!(
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    ),
    speechSynthesis: !!window.speechSynthesis,
    canvas: !!document.createElement("canvas").getContext,
  };
};

/**
 * Convert canvas to base64 image data
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {string} format - The image format (default: 'image/jpeg')
 * @param {number} quality - The image quality (0-1, default: 0.8)
 * @returns {string} - Base64 encoded image data
 */
export const canvasToBase64 = (
  canvas,
  format = "image/jpeg",
  quality = 0.8
) => {
  return canvas.toDataURL(format, quality);
};

/**
 * Log errors consistently
 * @param {string} context - The context where the error occurred
 * @param {Error} error - The error object
 * @param {Object} additionalInfo - Additional information about the error
 */
export const logError = (context, error, additionalInfo = {}) => {
  console.error(`[${context}] Error:`, error, additionalInfo);

  // In production, you might want to send this to an error reporting service
  if (process.env.NODE_ENV === "production") {
    // Example: Send to error reporting service
    // errorReportingService.log({ context, error, additionalInfo });
  }
};

/**
 * Format speech synthesis pitch value
 * @param {number} value - The pitch value
 * @param {number} scale - The scale factor (default: 10)
 * @returns {number} - The formatted pitch value
 */
export const formatPitchValue = (value, scale = 10) => {
  return (value + scale) / scale;
};

/**
 * Validate image data URL
 * @param {string} dataURL - The data URL to validate
 * @returns {boolean} - Whether the data URL is valid
 */
export const isValidImageDataURL = (dataURL) => {
  return typeof dataURL === "string" && dataURL.startsWith("data:image/");
};
