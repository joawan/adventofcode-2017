const fs = require('fs');
const pipes = fs.readFileSync('./' + process.argv[2])
    .toString()
    .split("\n")
    .map(e => e.split(''));

const res = [];
const h = pipes.length;
const w = pipes[0].length;
let s = 0;

const follow = (c, d) => {
    let x = c.x;
    let y = c.y;
    do {
        s++;
        x += d.x;
        y += d.y;
        if (/[A-Z]/.test(pipes[y][x])) res.push(pipes[y][x]);
    } while (pipes[y][x] !== '+' && pipes[y][x] !== ' ');
    return {x, y};
}

const whereTo = (c, d) => {
    const dirs = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];
    for (let n of dirs) {
        if (n.x === -d.x && n.y === -d.y ) continue; // Not back
        const x = c.x + n.x;
        const y = c.y + n.y;
        if (x < 0 || x >= w || y < 0 || y >= h) continue; // Not out of range
        if (!pipes[y][x].trim()) continue; // Not empty
        return n;
    }
}

const findStart = () => {
    for (let x = 0; x < pipes[0].length; x++) {
        if (pipes[0][x] == '|') return {x, y: 0};
    }
}

let current = findStart();
let dir = whereTo(current, {x: 0, y: 0});

while (dir) {
    current = follow(current, dir);
    dir = whereTo(current, dir);
}
console.log(res.join(''), s);
