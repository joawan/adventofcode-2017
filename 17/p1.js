const s = parseInt(process.argv[2], 10);
const a = [0];
let c = 0;

for (let i = 0; i <= 2017; i++) {
    c = (c + s) % a.length;
    c++;
    a.splice(c, 0, i + 1);
}

console.log(a[a.indexOf(2017) + 1]);
