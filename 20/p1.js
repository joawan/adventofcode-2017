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


const distance = a => Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);

particles.sort((a, b) => {
    const c1 = distance(a.a);
    const c2 = distance(b.a);
    if(c1 > c2) return 1;
    if(c1 < c2) return -1;
    return 0;
})

console.log(particles[0]);
