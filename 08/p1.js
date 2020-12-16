const fs = require('fs');

const r = [];
const file = fs.readFileSync('./' + process.argv[2]);
const rows = file.toString().split("\n")
    .map(e => {
        const [,v, op, ch, cv, ccon, ccom] = e.match(/([a-z]+) ([cedin]{3}) (-?\d+) if ([a-z]+) ([!<>=]+) (-?\d+)/);
        return {v, op, ch, cv, ccon, ccom};
    })
    .forEach(e => {
        r[e.v] = r[e.v] || 0;
        r[e.cv] = r[e.cv] || 0;
        op = e.op == 'inc' ? '+' : '-';
        eval(`if (r[e.cv] ${e.ccon} ${e.ccom}) r[e.v] ${op}= ${e.ch}`);
    });

console.log(Math.max(...Object.values(r)));
