const fs = require('fs');

const a = process.argv[2].split(' ').map(e => parseInt(e, 10))
const al = a.length;
const cs = [];
let r = 0;

const csCalc = (b) => b.reduce((acc, e) => acc += `#${e}`, '');

while (!cs.includes(csCalc(a))) {
    cs.push(csCalc(a));
    const i = a.indexOf(Math.max(...a));
    const v = a[i];
    a[i] = 0;
    for (let j = 1; j <= v; j++) {
        a[(i + j) % al]++
    }
    r++;
}

console.log(r);