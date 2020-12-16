console.log(process.argv[2].split('').filter((e, i, a) => e === a[(i + 1) % a.length]).reduce((s, c) => s + +c, 0));
