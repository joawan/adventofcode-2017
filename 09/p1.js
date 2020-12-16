const fs = require('fs');

const file = fs.readFileSync('./' + process.argv[2]);
const ch = file.toString().split('');

let g = [];

const skipIfBang = i => {
    while (ch[i] === '!') {
        i += 2;
    }
    return i;
};
const garbage = i => {
    if (ch[i] !== '<') return i;
    while (ch[i] !== '>') {
        i++;
        i = skipIfBang(i);
    }
    return i;
};
const group = (i, d = 1) => {
    if (ch[i] !== '{') return i;
    while(ch[i] !== '}') {
        i++;
        i = skipIfBang(i);
        i = garbage(i);
        i = group(i, d + 1);
    }
    i++;
    g.push(d);
    return i;
};

group(0);
console.log(g.reduce((a, e) => a + e));
