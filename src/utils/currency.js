/**
 * Format price in Indian Rupees (INR)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price string with ₹ symbol
 */
export const formatPrice = (amount) => {
  return `₹${Number(amount).toFixed(2)}`
}

/**
 * Format price for display (without decimal if it's a whole number)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price string
 */
export const formatPriceClean = (amount) => {
  const num = Number(amount)
  return num % 1 === 0 ? `₹${num}` : `₹${num.toFixed(2)}`
}
