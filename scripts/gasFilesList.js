
const path = require('path');
const fs = require('fs');

const gasFilesJsonDir = path.join(path.basename(__filename), "../public/gas/json");

const gasFiles = { "names": [] }

fs.readdirSync(gasFilesJsonDir).forEach(function (file) {
    gasFiles["names"].push(path.parse(file).base)
});

const gasFilesListFilename = path.join(path.basename(__filename), "../public/gas/list.json");

fs.writeFileSync(gasFilesListFilename, JSON.stringify(gasFiles));
