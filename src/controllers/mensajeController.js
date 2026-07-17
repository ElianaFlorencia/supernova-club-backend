const mensajeModel = require("../models/mensajeModel");

exports.crearMensaje = async (req, res) => {

    const {
        nombre,
        email,
        asunto,
        mensaje
    } = req.body;

    try {

        await mensajeModel.crear({
            id_usuario: req.user.ID,
            nombre,
            email,
            asunto,
            mensaje
        });

        res.json({
            success: true,
            message: "Mensaje enviado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error al enviar el mensaje"
        });

    }

};