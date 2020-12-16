const fs = require('fs');

const split = (m) => m.split('/').map(e => e.split(''));
const join = (m) => m.map(e => e.join('')).join('/');
const flip = (m, d) => d % 2 == 0 ? m.reverse() : m.map(e => e.reverse());
const rotate = (m) => {
    const n = m.reverse();
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < i; j++) {
            let t = m[i][j];
            n[i][j] = m[j][i];
            n[j][i] = t;
        }
    }
    return n;
};

const pick = (g, s, x, y) => {
    let o = [];
    for (let i = 0; i < s; i++) {
        o.push(g[x + i].slice(y, y+s));
    }
    return o;
}

const translate = (t, m) => {
    let ms = join(m);
    return split(t.filter(e => e.c.includes(ms)).pop().to);
}

const add = (o, m, x, y) => {
    for(let i = 0; i < m.length; i++) {
        for(let j = 0; j < m.length; j++) {
            o[x + i] = o[x + i] || [];
            o[x + i][y + j] = m[i][j];
        }
    }
    return o;
}


const trans = fs.readFileSync('./' + process.argv[2])
    .toString()
    .split("\n")
    .map((e, i) => {
        const m = e.match(/(.+) => (.+)/);
        return { from: m[1], to: m[2] };
    })
    .map(e => {
        let c = [];
        let m = split(e.from);
        for (let i = 0; i < 2; i++) {
            c.push(join(m));
            for (let j = 0; j < 4; j++) {
                c.push(join(m));
                m = rotate(m);
            }
            m = flip(m, i);
        }
        e.c = [...new Set(c)];
        return e;
    });

let grid = split('.#./..#/###');
for (let it = 0; it < 5; it++) {
    let ex = [];
    let w = grid.length % 2 === 0 ? 2 : 3;
    for (let r = 0; r < grid.length; r += w) {
        for (let c = 0; c < grid.length; c += w) {
            let m = pick(grid, w, r, c);
            let nm = translate(trans, m);
            add(ex, nm, (w + 1) * (r / w), (w + 1) * (c / w));
        }
    }
    grid = ex;
}

console.log(grid.map(e => e.join('')).join("\n"));
console.log(grid.map(e => e.join('')).join('').replace(/\./g, '').length);
