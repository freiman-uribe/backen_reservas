// Manejador de mensajes de exito.
exports.success = function (req, res, message, status){
    res.status(status || 200).send({
        status: status,
        data: message
    });
}

// Manejador de mensajes de error.
exports.error = function (req, res, message, status,details){
    res.status(status || 500).send({
        error: message,
        status: status
    });
}