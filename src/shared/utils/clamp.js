/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 */
const clamp = (number, lower, upper) => Math.max(lower, Math.min(upper, number));

export default clamp;
