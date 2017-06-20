//trims string to 150 chars and retrims string if words are cut off. Strips html tags too.
module.exports = (content) => {
    let trimmedString = content.substr(0, 150);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    return trimmedString.replace(/<(?:.|\n)*?>/gm, '');
};