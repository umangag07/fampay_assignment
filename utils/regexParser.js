// This function will create the array of word with the regular expression.
// Example [/best/i,/kickoffs/i]

module.exports = (str) => {
    str = str.split(' ');
    let regexWordArray = str.map((word) => {
        let re = new RegExp(word, 'i');
        return re;
    });
    return regexWordArray;
};
