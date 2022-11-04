const https = require("https")

function getTempOfLocation(location) {
    if (!location) {
        console.error("Location empty")
        return
    }

    return new Promise((resolve, reject) => {
        https.get(`https://wttr.in/${location}?format=j1`, (resp) => {
            if (resp.statusCode !== 200)
                reject(`Server responded with status code ${resp.statusCode}`)

            let data = ''
            resp.on('data', (chunk) => {
                data += chunk
            })
            resp.on('end', () => {
                let tempC = JSON.parse(data).current_condition[0].FeelsLikeC
                resolve(`${tempC}°`)
            })
        }).on("error", (err) => {
            reject(err.message)
        })
    })
}

// check arguments
if (process.argv.length !== 3) {
    console.error("Amount of args false")
    return
}

// get location as an argument of console
let location = process.argv[2]
getTempOfLocation(location)
    .then(tempC => console.log(tempC))
    .catch((err) => {
        console.error(err)
    })
