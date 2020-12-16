const fs = require('fs');

const file = fs.readFileSync('./' + process.argv[2]);
const rows = file.toString().split("\n").map(e => {
    const [, n, w, ,c] = e.match(/([a-z]+) \((\d*)\)( -> )?([a-z, ]*)?/);
    return { n, w : parseInt(w, 10), c : c ? c.split(", ") : []};
});

let node = rows[0];
while (true) {
    let a = rows.filter(e => e.c.includes(node.n));
    if (a.length == 0) break;
    node = a.pop();
}

console.log(node);