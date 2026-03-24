const { v4: uuidv4 } = require('uuid');

/**
 * Generates a unique, readable, program-specific registration ID
 * Format: PREFIX-XXXX-XXXX where X is alphanumeric uppercase
 *
 * @param {string} prefix - Program/form specific prefix (e.g., 'REG', 'EVT')
 * @returns {string} Unique readable ID
 */
const generateUniqueId = (prefix = 'REG') => {
  // Generate a UUID and extract characters for readability
  const uuid = uuidv4().replace(/-/g, '').toUpperCase();

  // Take 8 characters from the UUID for the readable part
  const part1 = uuid.substring(0, 4);
  const part2 = uuid.substring(4, 8);

  return `${prefix}-${part1}-${part2}`;
};

/**
 * Generates a sequential-style unique ID based on count
 * Format: PREFIX-0001
 *
 * @param {string} prefix - Program/form specific prefix
 * @param {number} sequenceNumber - The sequence number
 * @returns {string} Sequential unique ID
 */
const generateSequentialId = (prefix = 'REG', sequenceNumber = 1) => {
  const padded = String(sequenceNumber).padStart(4, '0');
  return `${prefix}-${padded}`;
};

module.exports = { generateUniqueId, generateSequentialId };
