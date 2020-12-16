const fs = require('fs');

const file = fs.readFileSync('./' + process.argv[2]);
const a = file.toString().split("\n").map(e => parseInt(e, 10));

let i = 0;
let s = 0;
while (true) {
    const v = a[i];
    a[i]++;
    i += v;
    s++;
    if (i >= a.length) break;
}
console.log('Steps', s);
