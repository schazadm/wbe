require('./scripts.js')

function scriptOfSample(character, scripts) {
    if (character.length !== 1)
        return
    let code = character.codePointAt(0)
    let name = 'unknown'
    for (let script of scripts)
        for (let range of script.ranges)
            if (range[0] <= code && code < range[1])
                return script.name
    return name
}

function scriptsInString(string, scripts) {
    let usedCharSets = {}
    string.split('').forEach(character => {
        key = scriptOfSample(character, scripts)
        usedCharSets[key] = (usedCharSets[key] || 0) + 1
    })
    return usedCharSets
}

// console.log(scriptOfSample("A", SCRIPTS))
// console.log(scriptOfSample("英", SCRIPTS))
// console.log(scriptOfSample("я", SCRIPTS))
// console.log(scriptOfSample("-", SCRIPTS))
// console.log(scriptOfSample("م", SCRIPTS))

// console.log(scriptsInString('英国的狗说 "JavaScript", "тяв"', SCRIPTS))
// console.log(scriptsInString('https://pоstfinance.ch', SCRIPTS))

module.exports = { scriptOfSample }