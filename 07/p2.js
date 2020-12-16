const fs = require('fs');

const file = fs.readFileSync('./' + process.argv[2]);
const p = [];
const rows = file.toString().split("\n").map(e => {
    const [, n, w, ,c] = e.match(/([a-z]+) \((\d*)\)( -> )?([a-z, ]*)?/);
    const node = { n, w : parseInt(w, 10), c : c ? c.split(", ") : [] };
    p[n] = node;
    return node;
});

let node = rows[0];
while (true) {
    let a = rows.filter(e => e.c.includes(node.n));
    if (a.length == 0) break;
    node = a.pop();
}

const root = node;

function build(n) {
    const node = p[n];
    node.c = p[n].c.map(build);
    return node;
}

function weight(n) {
    n.cw = n.w + n.c.reduce((acc, e) => acc + weight(e), 0); 
    return n.cw;
}

function print(n, i = 0) {
    console.log("\t".repeat(i), n.n, n.w, n.cw);
    n.c.map(e => print(e, i+1));
}

root.c = root.c.map(build);
root.cw = weight(root);

print(root);
