const sa = parseInt(process.argv[2].trim(), 10);
const sb = parseInt(process.argv[3].trim(), 10);

const d = 2147483647;
const fa = 16807;
const fb = 48271;
const ma = 4;
const mb = 8;

function* gen (s, f, m) {
    while(true) {
        s = (s * f) % d;
        if (s % m == 0)
            yield s.toString(2).substr(-16, 16);
    }
}

const genA = gen(sa, fa, ma);
const genB = gen(sb, fb, mb);

let c = 0;
for (let i = 0; i < 5*1000*1000; i++) {
    if (genA.next().value === genB.next().value) c++;
}
console.log(c);
