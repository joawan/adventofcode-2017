const fs = require('fs');

const keyed = [];
const m = [];

const file = fs.readFileSync('./' + process.argv[2]);
const rows = file.toString().split("\n")
    .map(e => {
        const [,p, l] = e.match(/([\d]+) <-> ([\d, ]+)/);
        return {p, l: l.split(', ')};
    })
    .map(e => {
        keyed[e.p] = e;
        return e;
    });

const canTalkTo = (e) => {
    m.push(e.p);
    e.l.forEach(c => {
        if (!m.includes(keyed[c].p))
            canTalkTo(keyed[c]);
    });
};

g = 0;
rows.forEach(e => {
    if (!m.includes(e.p)) {
        g++;
        canTalkTo(keyed[e.p]);
    }
});

console.log(m.length, g);