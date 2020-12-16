const fs = require('fs');

const r = fs.readFileSync('./' + process.argv[2]).toString().split("\n")
    .map(e => {
        const [,p, v] = e.match(/(\d+): (\d+)/);
        return {p: +p, v: +v};
    })
    .filter((e) => e.p % ((e.v - 1) * 2) === 0)
    .reduce((a, e) => a + (e.p * e.v), 0);

console.log(r);
