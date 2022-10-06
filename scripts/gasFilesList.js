
const path = require('path');
const fs = require('fs');

const gasFilesJsonDir = path.join(path.basename(__filename), "../public/gas/json");

const gasFiles = fs.readdirSync(gasFilesJsonDir).map(function (file) {
    const filepath = path.parse(file)

    try {
        const data = JSON.parse(fs.readFileSync(path.join(gasFilesJsonDir, file)))
        return {
            filename: filepath.base,
            pressure: data.pressure,
            temperature: data.temperature,
            components: data.components
        }
    }
    catch (error) {
        console.log(`warning: '${file}' is not a valid JSON file`)
        return null
    }

}).filter((item) => item !== null)

const gasFilesListFilename = path.join(path.basename(__filename), "../public/gas/list.json");

fs.writeFileSync(gasFilesListFilename, JSON.stringify(gasFiles));
