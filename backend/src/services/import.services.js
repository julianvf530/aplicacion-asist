const importRepository = require("../repositories/import.repository");

async function importMembers(filePath) {

    if (!filePath) {
        throw new Error("No se ha recibido ningún archivo");
    }

    return importRepository.importMembers(filePath);

}

module.exports = {
    importMembers
};