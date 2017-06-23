/**
 * Trims string to 150 characters, retrims string if words are cut off and strips html tags.
 * @param {string} content - Product description string originating from tablets.json
 * @return {string} - Trimmed string
 */
module.exports = (content) => {
    let trimmedString = content.substr(0, 150);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    return trimmedString.replace(/<(?:.|\n)*?>/gm, "");
};