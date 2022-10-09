require('./scripts.js')

function oldAndLiving(scripts) {
    let lang = []
    for (let script of scripts)
        if (script.year < 0 && script.living)
            lang.push(script.name)
    return lang
}

function oldAndLiving2(scripts) {
    return scripts.filter(s => s.year < 0 && s.living).map(s => s.name)
}

function numberOfCodes(script) {
    let sum = 0
    for (let range of script.ranges)
        sum += range[1] - range[0]
    return sum
}

// const numberOfCodes = ({ ranges }) => ranges.reduce((curr, [from, to]) => curr + to - from, 0)

// console.log(`for-loop:\n${oldAndLiving(SCRIPTS).toString()}`)
// console.log(`functional:\n${oldAndLiving2(SCRIPTS).toString()}`)
console.log(numberOfCodes(SCRIPTS[3]))