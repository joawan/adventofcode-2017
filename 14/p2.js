const input = process.argv[2].trim();

function hash(str) {
    const a = [];
    const length = 256;
    let c = 0;
    let s = 0;
    for (let i = 0; i < length; i++) {
        a.push(i);
    }

    const steps = str.split('').map(e => e.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
    for (let r = 0; r < 64; r++) {
        steps.map((e) => {
            let t = [];
            for (let j = 0; j < e; j++) {
                t.push(a[(c + j) % length]);
            }
            t = t.reverse();
            for (let j = 0; j < e; j++) {
                a[(c + j) % length] = t.shift();
            }
            c = (c + s + e) % length;
            s++;
        });
    }

    return a
        .reduce((acc, e, i) => {
            acc[Math.floor(i / 16)] ^= e;
            return acc;
        }, Array(16).fill(0))
        .reduce((acc, e) => acc + `00${e.toString(16)}`.substr(-2,2), '');
}

function group(m, i, j) {
    if (i < 0 || i > 127 || j < 0 || j > 127) return;
    if (m[i][j] !== '1') return;
    m[i][j] = '.';
    group(m, i, j+1);
    group(m, i, j-1);
    group(m, i+1, j);
    group(m, i-1, j);

}

let m = [];
for (let i = 0; i < 128; i++) {
    m[i] = hash(`${input}-${i}`).split('')
        .map(e => `0000${parseInt(e, 16).toString(2)}`.substr(-4,4))
        .reduce((a, e) => a + e, '')
        .split('');
}

let g = 0;
for (let i = 0; i < 128; i++) {
    for (let j = 0; j < 128; j++) {
        if (m[i][j] === '1') {
            g++;
            group(m, i, j);
        }
    }
}

for (r of m) {
    console.log(r.join(''));
}
console.log(g);
