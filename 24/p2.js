const fs = require('fs');
const list = fs.readFileSync('./' + process.argv[2])
    .toString()
    .split("\n")
    .map(e => {
        const [c, d] = e.split('/');
        return {c: +c, d: +d, n: e};
    });

const a = [];

const connect = (f, n) => {
    const m = list.filter(e => (e.c == f || e.d == f) && !n.includes(e.n));
    if (m.length == 0) {
        a.push(n);
        return;
    }
    m.forEach(e => {
        const nn = n.slice(0);
        nn.push(e.n);
        const nf = e.c == f ? e.d : e.c;
        connect(nf, nn);
    });
}

connect(0, []);
let top = 0;
let score = 0;
a
    .map(e => { top = e.length > top ? e.length : top; return e})
    .filter(e => top === e.length)
    .map(e => e.reduce((acc, f) => acc + +f.split('/')[0] + +f.split('/')[1], 0))
    .map(e => { score = e > score ? e : score; return e});
console.log(top, score);
