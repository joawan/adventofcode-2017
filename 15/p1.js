const sa = parseInt(process.argv[2].trim(), 10);
const sb = parseInt(process.argv[3].trim(), 10);

const d = 2147483647;
const fa = 16807;
const fb = 48271;

function* gen (s, f) {
    while(true) {
        s = (s * f) % d;
        yield s.toString(2).substr(-16, 16);
    }
}

const genA = gen(sa, fa);
const genB = gen(sb, fb);

let c = 0;
for (let i = 0; i < 40*1000*1000; i++) {
    if (genA.next().value === genB.next().value) c++;
}
console.log(c);
