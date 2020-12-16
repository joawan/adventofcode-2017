const fs = require('fs');
const particles = fs.readFileSync('./' + process.argv[2])
    .toString()
    .split("\n")
    .map((e, i) => {
        const m = e.match(/-?\d+/g);
        return {
            p: {x: +m[0], y: +m[1], z: +m[2]},
            v: {x: +m[3], y: +m[4], z: +m[5]},
            a: {x: +m[6], y: +m[7], z: +m[8]},
            n: i
        };
    });

const sumChord = (a, b) => {
    a.x += b.x;
    a.y += b.y;
    a.z += b.z;
    return a;
}

const name = a => `${a.x},${a.y},${a.z}`;
let l = particles;

for (let r = 0; r < 100; r++) {
    let collisions = [];
    l = l.map(p => {
        p.v = sumChord(p.v, p.a);
        p.p = sumChord(p.p, p.v);
        const n = name(p.p);
        collisions[n] = collisions[n] || [];
        collisions[n].push(p.n);
        return p;
    }).filter(p => collisions[name(p.p)].length == 1);
}

console.log(l.length);
