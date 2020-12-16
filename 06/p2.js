const fs = require('fs');

let a = process.argv[2].split(' ').map(e => parseInt(e, 10))
const al = a.length;
const cs = [];
let r = 0;
let ra = 0;

const csCalc = (b) => b.reduce((acc, e) => acc += `#${e}`, '');
const reDist = () => {
    const i = a.indexOf(Math.max(...a));
    const v = a[i];
    a[i] = 0;
    for (let j = 1; j <= v; j++) {
        a[(i + j) % al]++
    }
};
while (!cs.includes(csCalc(a))) {
    cs.push(csCalc(a));
    reDist();
    r++;
}
let csc = csCalc(a);
do {
    reDist();
    ra++
} while (csc != csCalc(a));

console.log(r, ra);