const fs = require('fs');
const { readFile } = require('fs').promises

function readCSV(filepath) {
    return readFile(filepath, 'utf8')
}

function csv2json(csv) {
    return new Promise((resolve, reject) => {
        try {
            let lineSeparetadCSVArr = csv.split('\n')
            let header = lineSeparetadCSVArr[0].split(',')
            let jsonArr = []
            for (let i = 1; i < lineSeparetadCSVArr.length; i++) {
                let tmpLine = lineSeparetadCSVArr[i].split(',')
                let tmpObj = {}
                for (let j = 0; j < tmpLine.length; j++) {
                    tmpObj[header[j]] = tmpLine[j]
                }
                jsonArr.push(tmpObj)
            }
            resolve(JSON.stringify(jsonArr))
        } catch (err) {
            reject(err)
        }
    })
}

function saveFile(filepath, content) {
    return fs.writeFile(filepath, content, err => {
        if (err) console.error(err)
    });
}

function logStatsOfFile(filepath) {
    const startTime = Date.now()
    fs.readFile(filepath, "utf8", (err, data) => {
        if (err) throw err
        const totalReadingTime = Date.now() - startTime;
        console.log(`Reading the file took ${totalReadingTime}ms`);
    })

    fs.stat(filepath, (err, stats) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(`Filesize: ${stats.size} bytes`)
        console.log(`Last change: ${stats.mtime}`)
    })

    let i;
    let count = 1;
    fs.createReadStream(filepath)
        .on('data', function (chunk) {
            for (i = 0; i < chunk.length; ++i)
                if (chunk[i] == 10) count++;
        })
        .on('end', function () {
            console.log(`Number of records ${count}`);
        });
}

// check arguments
if (process.argv.length !== 4) {
    console.error("Amount of args false")
    return
}

// get arguments of console
let pathToCSV = process.argv[2]
let pathToJSON = process.argv[3]

// logStatsOfFile('csv/population.csv')
readCSV(pathToCSV)
    .catch(() => {
        console.log("Error reading file")
    })
    .then(data => csv2json(data))
    .catch(() => {
        console.log("Error parsing csv -> json")
    })
    .then(data => saveFile(pathToJSON, data))
    .catch(() => {
        console.log("Error writing json file")
    })
    .then(() => {
        console.info(`${pathToCSV} parsed into ${pathToJSON}`)
    })
