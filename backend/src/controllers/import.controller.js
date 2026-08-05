const importService = require("../services/import.services");

async function importMembers(req, res, next) {

    try {

        if (!req.file) {

            return res.status(400).json({
                message: "No se ha seleccionado ningún archivo"
            });

        }

        const result = await importService.importMembers(
            req.file.path
        );

        res.json(result);

    } catch (error) {

        next(error);

    }

}

module.exports = {
    importMembers
};