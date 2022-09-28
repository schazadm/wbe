function findTag(text) {
    const openingTag = '<';
    const closingTag = '>';
    const whiteSpace = ' ';
    let tag;
    let writeMode = false;
    // loop through each letter
    for (let i = 0; i < text.length; i++) {
        // if an opening tag is found then set to write mode, reset tag
        if (text[i] === openingTag) {
            tag = '';
            writeMode = true;
        }
        // if write mode is on then add letter
        if (writeMode) tag += text[i];
        // if a closing tag is found then break loop
        if (text[i] === closingTag) break;
    }
    // check if tag has whitepsaces
    if (tag.includes(whiteSpace)
        || !tag.includes(openingTag)
        || !tag.includes(closingTag)
    ) {
        return undefined;
    }
    // remove opening and closing tag
    tag = tag.replace(openingTag, '');
    tag = tag.replace(closingTag, '');
    return tag;
}

module.exports = { findTag }