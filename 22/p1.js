const fs = require('fs');
const grid = fs.readFileSync('./' + process.argv[2])
    .toString()
    .split("\n")
    .map(e => e.split(''));

let x = Math.floor(grid.length / 2);
let y = Math.floor(grid.length / 2);
let d = 0;
let c = 0;

for (let it = 0; it < 10000; it++) {
    grid[x] = grid[x] || [];
    let infected = grid[x][y] === '#';
    if (infected) {
        grid[x][y] = '.';
        d++;
    } else {
        grid[x][y] = '#';
        c++;
        d--;
    }
    d &= 3;
    switch(d) {
        case 0: x--; break;
        case 1: y++; break;
        case 2: x++; break;
        case 3: y--; break;
    }
}

console.log(c);
