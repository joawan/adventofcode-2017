const fs = require('fs');

const l = parseInt(process.argv[2], 10);
const ins = fs.readFileSync('./' + process.argv[3]).toString().split(',');
const a = [];

for (let i = 0; i < l; i++) {
    a.push(String.fromCharCode(97 + i));
}

ins.map(e => {
    const m = e.match('([sxp])([0-9a-p]+)/?([0-9a-p]+)?');
    switch(m[1]) {
        case 's':
            a.unshift(...a.splice(- +m[2], +m[2]));
            break;
        case 'x':
            const t = a[m[2]];
            a[m[2]] = a[m[3]];
            a[m[3]] = t;
            break;
        case 'p':
            const i = a.indexOf(m[2]);
            const j = a.indexOf(m[3]);
            a[i] = m[3];
            a[j] = m[2];
            break;
    }
});
console.log(a.join(''));
