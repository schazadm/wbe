const fs = require('fs');
const { readFile } = require('fs').promises

function readCSV(filepath) {
    readFile(filepath, 'utf8').then(data => csv2json(data))
}

function csv2json(csv) {
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

    let json = JSON.stringify(jsonArr)
    console.log(json);
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

// logStatsOfFile('csv/population.csv')
readCSV('csv/population_test.csv')
// get arguments of console
// process.argv[2]