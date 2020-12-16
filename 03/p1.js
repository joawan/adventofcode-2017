const input = process.argv[2];

const side = Math.ceil(Math.sqrt(input));
const d1 = Math.floor(side / 2);

const diff = Math.pow(side, 2) - input;
const d2 = Math.abs(d1 - diff % (side - 1));

console.log(side, d1, d2, d1 + d2);
