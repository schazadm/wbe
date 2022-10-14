function parseToProto(json, proto) {
    return Object.assign(Object.create(proto), JSON.parse(json))
}


// npx jasmine .\spec\jasmine_examples\ParseSpec.js
/**
Debugger attached.
Debugger attached.
Randomized with seed 57274
Started
..


2 specs, 0 failures
Finished in 0.007 seconds
Randomized with seed 57274 (jasmine --random=true --seed=57274)
Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
 */


module.exports = { parseToProto }