const fs = require('fs');

const l = parseInt(process.argv[2], 10);
const ins = fs.readFileSync('./' + process.argv[3])
    .toString()
    .split(',')
    .map(e => {
        [, op, x, y] = e.match('([sxp])([0-9a-p]+)/?([0-9a-p]+)?');
        return {op, x, y};
    });

const a = [];
for (let i = 0; i < l; i++) {
    a.push(String.fromCharCode(97 + i));
}
const b = a.join('');

const permute = () => {
    ins.forEach(e => {
        switch(e.op) {
            case 's':
                a.unshift(...a.splice(- +e.x, +e.x));
                break;
            case 'x':
                const t = a[e.x];
                a[e.x] = a[e.y];
                a[e.y] = t;
                break;
            case 'p':
                const i = a.indexOf(e.x);
                const j = a.indexOf(e.y);
                a[i] = e.y;
                a[j] = e.x;
                break;
        }
    });
}

c = 0;
do {
    c++;
    permute();
} while (a.join('') !== b)

for (let j = 0; j < 1000*1000*1000%c; j++) {
    permute();
}

console.log(a.join(''));
