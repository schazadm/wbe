let sum = 0
for (let i = 1; i < 16; i++) {
    sum += 1 / (2 ** i)
}
console.log(sum + 1 / (2 ** 15))