function renderSJDON(element, root) {
    // we expect an array
    if (!Array.isArray(element)) return
    // the first element of the array should always be the type
    if (typeof element[0] !== 'string') return
    let node = document.createElement(element[0])
    for (let i = 1; i < element.length; i++) {
        if (Array.isArray(element[i])) {
            // if the item is an array then we assume it's a child
            // which then leads to a recursive call
            renderSJDON(element[i], node)
        } else if (typeof element[i] === 'string') {
            // create a text node and append to the current node
            node.appendChild(document.createTextNode(element[i]))
        } else {
            // if the item isn't an array nor a string then we assume that it has to be the attributes
            // might lead to errors...xD
            Object.keys(element[i]).forEach(key => {
                node.setAttribute(key, element[i][key])
            })
        }
    }
    return root.appendChild(node)
}
