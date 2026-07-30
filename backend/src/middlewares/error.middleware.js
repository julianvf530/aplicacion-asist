function errorHandler(error, req, res, next) {

    console.error(error);

    res.status(400).json({

        message: error.message || "Error interno del servidor"

    });

}

module.exports = errorHandler;