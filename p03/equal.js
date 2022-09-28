function equal(a, b) {
    // check if value is the same
    if (a === b) return true;

    if (typeof a === typeof b) {
        // check if objects are empty
        if (Object.keys(a).length === 0 && Object.keys(b).length === 0)
            return true;
        // check if objects has same amount of keys
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        // loop through each key of obj a
        for (const key of Object.keys(a)) {
            // check if obj b has current key
            if (!Object.keys(b).includes(key))
                return false;
            // check if the values of each key are the same
            if (a[key] !== b[key])
                return false;
        }
        return true;
    }
    return false;
}

module.exports = { equal }