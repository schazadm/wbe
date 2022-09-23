const assert = require('assert')

function power(b, n) {
    assert.ok(Number.isInteger(b))
    assert.ok(Number.isInteger(n))
    assert.ok(b >= 0)
    assert.ok(n >= 0)

    if (n == 0)
        return 1
    if (n % 2 == 0) {
        let pew = power(b, n / 2)
        return pew * pew
    }
    return b * power(b, n - 1)
}

module.exports = { power }