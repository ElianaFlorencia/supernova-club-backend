const reservaModel = require("../models/reservaModel");

exports.crearReserva = async (req, res) => {

    const {
        id_deporte,
        fecha,
        hora_inicio,
        hora_fin
    } = req.body;

    try {

        await reservaModel.crear({
            id_usuario: req.user.ID,
            id_deporte,
            fecha,
            hora_inicio,
            hora_fin
        });

        res.json({
            success: true,
            message: "Reserva registrada correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Error al registrar la reserva"
        });

    }

};