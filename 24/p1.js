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
        a.push(n.reduce((acc, e) => {
            const s = e.split('/');
            return acc + +s[0] + +s[1];
        }, 0));
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
a.map(e => top = (e > top) ? e : top);
console.log(top);
