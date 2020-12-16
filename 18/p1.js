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

function run() {

    const a = [];
    let last = null;

    this.set = (x, y) => a[x] = y;
    this.add = (x, y) => a[x] = (a[x] || 0) + y;
    this.mul = (x, y) => a[x] = (a[x] || 0) * y;
    this.mod = (x, y) => a[x] = (a[x] || 0) % y;
    this.jgz = (x, y, i) => (a[x] || x) > 0 ? i + y - 1 : i;
    this.snd = (x) => last = Number.isInteger(a[x]) ? a[x] : x;
    this.rcv = (x) => a[x];

    for (let i = 0; i < ins.length; i++) {
        const e = ins[i];
        const y = Number.isInteger(e.y) ? e.y : (a[e.y] || 0);
        const r = this[e.op](e.x, y, i);
        if (e.op == 'jgz') i = r;
        if (e.op == 'rcv' && r) return last;
    }
}

console.log(run());
