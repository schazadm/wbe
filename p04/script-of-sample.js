// require('./scripts_test.js')

function scriptOfSample(character, scripts) {
    // if (character.length !== 1)
    //     return
    let code = character.codePointAt(0)
    let name = 'unknown'
    for (let script of scripts)
        for (let range of script.ranges)
            if (range[0] <= code && code < range[1])
                return script.name
    return name
}

// console.log(scriptOfSample("A", SCRIPTS))
// console.log(scriptOfSample("英", SCRIPTS))
// console.log(scriptOfSample("я", SCRIPTS))
// console.log(scriptOfSample("-", SCRIPTS))
// console.log(scriptOfSample("م", SCRIPTS))
// console.log(scriptOfSample("Ù…Ø³Ø§Ø¡ Ø§Ù„Ø®ÙŠØ±", SCRIPTS))
// console.log(scriptOfSample("è", SCRIPTS))
// console.log(scriptOfSample("‹", SCRIPTS))
// console.log(scriptOfSample("±", SCRIPTS))

module.exports = { scriptOfSample }