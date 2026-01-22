/**
 * Clamp a value between min and max
 */
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

/**
 * Get random float between min and max
 */
export const randomFloat = (min, max) => Math.random() * (max - min) + min;

/**
 * Get random integer between min and max (inclusive)
 */
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get random item from an array
 */
export const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generate a random walk step
 */
export const randomWalk = (current, stepSize, min, max) => {
    const step = randomFloat(-stepSize, stepSize);
    return clamp(current + step, min, max);
};

/**
 * Format timestamp to ISO string
 */
export const getTimestamp = () => new Date().toISOString();
