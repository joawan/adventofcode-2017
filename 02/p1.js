const es = require('event-stream');
const reduce = require('stream-reduce');

process.stdin
    .pipe(es.split())
    .pipe(es.map((d, c) => {
        const a = d.split(' ').map(e => +e).filter(e => !!e);
        const r = Math.max(...a) - Math.min(...a);
        c(null, r);
    }))
    .pipe(reduce((s, d) => s + d, 0))
    .on('data', console.log);
