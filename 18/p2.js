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

function Program(id, mQ, oQ) {

    const a = { p: id };
    this.w = false;
    this.c = 0;

    this.set = (x, y) => a[x] = y;
    this.add = (x, y) => a[x] = (a[x] || 0) + y;
    this.mul = (x, y) => a[x] = (a[x] || 0) * y;
    this.mod = (x, y) => a[x] = (a[x] || 0) % y;
    this.jgz = (x, y, i) => (a[x] || x) > 0 ? i + y - 1 : i;
    this.snd = (x) => oQ.push(Number.isInteger(a[x]) ? a[x] : x);
    this.rcv = (x) => {
        const rv = mQ.shift();
        if (rv) {
            a[x] = rv;
            this.w = false;
        } else {
            this.w = true;
        }
    };

    this.run = function* () {
        for (let i = 0; i < ins.length; i++) {
            const e = ins[i];
            const y = Number.isInteger(e.y) ? e.y : (a[e.y] || 0);
            const r = this[e.op](e.x, y, i);
            
            if (e.op == 'jgz' && r) i = r;
            if (e.op == 'rcv' && this.w) i--;
            if (e.op == 'snd') this.c++;
            yield;
        }
    }
}

const p0Q = []; 
const p1Q = [];

const p0 = new Program(0, p0Q, p1Q);
const p1 = new Program(1, p1Q, p0Q);
const p0r = p0.run();
const p1r = p1.run();

while (!(p0.w && p1.w)) {
    p0r.next();
    p1r.next();
}

console.log(p1.c);
