const input = process.argv[2].trim().split(',');

let [x, y, z] = [0 ,0 ,0];
const m = [];

input.map((e) => {
    switch (e) {
        case 'n':
            x++;
            y--;
            break;
        case 'ne':
            y--;
            z++;
            break;
        case 'se':
            x--;
            z++;
            break;
        case 's':
            x--;
            y++;
            break;
        case 'sw':
            y++;
            z--;
            break;
        case 'nw':
            x++;
            z--;
            break;
    }
    m.push(Math.max(Math.abs(x), Math.abs(y), Math.abs(z)));
});
console.log(x, y, z);
console.log(Math.max(Math.abs(x), Math.abs(y), Math.abs(z)))
console.log(Math.max(...m));