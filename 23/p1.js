const fs = require('fs');
const ins = fs.readFileSync('./' + process.argv[2])
    .toString()
    .split("\n")
    .map(e => {
        const m = e.match('(.{3}) (.) ?(.+)?');
        const x = /[a-z]/.test(m[2]) ? m[2] : +m[2];
        const y = /[a-z]/.test(m[3]) ? (m[3] || null) : +m[3];
        return {op: m[1], x, y}
    });

let c = 0;
function run() {

    const a = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0};

    this.set = (x, y) => a[x] = y;
    this.sub = (x, y) => a[x] -= y;
    this.mul = (x, y) => a[x] *= y;
    this.jnz = (x, y, i) => (parseInt(x, 10) || a[x]) !== 0 ? i + y - 1 : i;

    for (let i = 0; i < ins.length; i++) {
        const e = ins[i];
        const y = Number.isInteger(e.y) ? e.y : (a[e.y] || 0);
        const r = this[e.op](e.x, y, i);
        if (e.op == 'jnz') i = r;
        if (e.op == 'mul') c++;
    }
}

run()
console.log(c);
