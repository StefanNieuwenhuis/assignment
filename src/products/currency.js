/**
 * Converts number to Dutch currency string
 * @param {number} - Product price originating from tablets.json
 * @return {string} - Converted string
 * 
 */
module.exports = (content) => {
    return `${content.toLocaleString("nl-NL", {"style": "currency", "currency": "EUR"})}`;
};

