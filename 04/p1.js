const fs = require('fs');

const file = fs.readFileSync('./challengedata');
const phrases = file.toString().split("\n");
const valid = phrases.filter(p => {
    const words = p.split(' ');
    const unique = [...new Set(words)];
    return words.length === unique.length;
});

console.log(valid.length);
