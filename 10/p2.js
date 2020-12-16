const length = parseInt(process.argv[2], 10);
const input =  process.argv[3].trim();
const a = [];
let c = 0;
let s = 0;

for (let i = 0; i < length; i++) {
    a.push(i);
}

const steps = input.split('').map(e => e.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
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

const res = a
    .reduce((acc, e, i) => {
        acc[Math.floor(i / 16)] ^= e;
        return acc;
    }, Array(16).fill(0))
    .reduce((acc, e) => acc + `00${e.toString(16)}`.substr(-2,2), '');
console.log(res);
