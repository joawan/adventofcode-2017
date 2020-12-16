const isPrime = (n) => {
    const m = Math.floor(Math.sqrt(n));
    for (let i = 2; i < m; i++) if (n % i == 0) return false;
    return true
}

const b = 108100;
let h = 0;
for (let i = 0; i <= 1000; i++) {
    if (!isPrime(b + (i*17))) h++;
}

console.log(h);
