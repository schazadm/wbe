// require('./scripts.js')

function scriptOfSample(character, scripts) {
    if (character.length !== 1)
        return
    let code = character.codePointAt(0)
    let name = 'unknown'
    for (let script of scripts)
        for (let range of script.ranges)
            if (range[0] <= code && range[1] >= code)
                name = script.name
    return name
}

// console.log(scriptOfSample("A", SCRIPTS))
// console.log(scriptOfSample("英", SCRIPTS))
// console.log(scriptOfSample("я", SCRIPTS))
// console.log(scriptOfSample("-", SCRIPTS))
// console.log(scriptOfSample("م", SCRIPTS))

module.exports = { scriptOfSample }