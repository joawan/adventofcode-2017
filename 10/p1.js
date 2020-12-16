//5 3,4,1,5
//256 83,0,193,1,254,237,187,40,88,27,2,255,149,29,42,100

const length = parseInt(process.argv[2], 10);
const steps =  process.argv[3].split(',').map(e => +e);
const a = [];
let c = 0;

for (let i = 0; i < length; i++) {
    a.push(i);
}

steps.map((e, i) => {
    let t = [];
    for (let j = 0; j < e; j++) {
        t.push(a[(c + j) % length]);
    }
    t = t.reverse();
    for (let j = 0; j < e; j++) {
        a[(c + j) % length] = t.shift();
    }
    c = (c + i + e) % length;
});

console.log(a[0] * a[1]);
