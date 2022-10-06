
const path = require('path');
const fs = require('fs');

const gasFilesJsonDir = path.join(path.basename(__filename), "../public/gas/json");

const gasFiles = fs.readdirSync(gasFilesJsonDir).map(function (file) {
    const filepath = path.parse(file)
    if (filepath.ext !== ".json") {
        return null
    }
    return {
        filename: filepath.base,
    }
}).filter((item) => item !== null)

const gasFilesListFilename = path.join(path.basename(__filename), "../public/gas/list.json");

fs.writeFileSync(gasFilesListFilename, JSON.stringify(gasFiles));
