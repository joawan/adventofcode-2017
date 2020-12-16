const es = require('event-stream');
const reduce = require('stream-reduce');

process.stdin
    .pipe(es.split())
    .pipe(es.map((d, c) => {
        const l = d.split(' ').map(e => +e).filter(e => !!e);
        const b = l.filter(e => l.filter(d => e % d === 0 || d % e === 0).length > 1);
        c(null, Math.max(...b) / Math.min(...b));
    }))
    .pipe(reduce((s, d) => s + d, 0))
    .on('data', console.log);
