module.exports = (content) => {
    return `${content.toLocaleString('nl-NL', {"style": "currency", "currency": "EUR"})}`;
};

