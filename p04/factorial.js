const assert = require('assert')

function factorial(n) {
    let sum = 1
    let i = n

    if (typeof n == 'bigint') {
        sum = BigInt(1)
        i = BigInt(n)
    }

    for (; i > 0; i--)
        sum *= i

    return sum
}

module.exports = { factorial }