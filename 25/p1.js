
// Example states
/* *
const states = {
    a: (v) => v === 1 ? { w: 0, m: -1, g: 'b' } : { w: 1, m: 1, g: 'b' },
    b: (v) => v === 1 ? { w: 1, m: 1, g: 'a' } : { w: 1, m: -1, g: 'a' }
};
const it = 6;
*/
// Challenge state
/* */
const states = {
    a: (v) => v === 1 ? { w: 0, m: -1, g: 'c' } : { w: 1, m: 1, g: 'b' },
    b: (v) => v === 1 ? { w: 1, m: -1, g: 'd' } : { w: 1, m: -1, g: 'a' },
    c: (v) => v === 1 ? { w: 0, m: 1, g: 'c' } : { w: 1, m: 1, g: 'd' },
    d: (v) => v === 1 ? { w: 0, m: 1, g: 'e' } : { w: 0, m: -1, g: 'b' },
    e: (v) => v === 1 ? { w: 1, m: -1, g: 'f' } : { w: 1, m: 1, g: 'c' },
    f: (v) => v === 1 ? { w: 1, m: 1, g: 'a' } : { w: 1, m: -1, g: 'e' }
};
const it = 12656374;
/**/

const t = [];
let c = 0;
let s = 'a';

for (let i = 0; i < it; i++) {
    const ins = states[s](t[c]);
    t[c] = ins.w;
    c += ins.m;
    s = ins.g;
}

console.log(Object.values(t).reduce((a, e) => a + e));
