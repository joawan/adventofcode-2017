const s = parseInt(process.argv[2], 10);
let c = 0;
let l = 1;
let r = 0;

for (let i = 0; i < 50*1000*1000; i++) {
    c = (c + s) % l;
    if (c === 0) r = i + 1;

    l++;
    c++;
}

console.log(r);
