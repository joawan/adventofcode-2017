const fs = require('fs');

const rows = fs.readFileSync('./' + process.argv[2]).toString().split("\n")
    .map(e => {
        const [,p, v] = e.match(/(\d+): (\d+)/);
        return {p: +p, v: +v};
    });

const gotThrough = (r, d) => {
    for (let e of r) {
        if ((e.p + d) % ((e.v - 1) * 2) === 0) return false;
    }
    return true;
}

let d = 0;
while (!gotThrough(rows, d)) d++;
console.log(d);
