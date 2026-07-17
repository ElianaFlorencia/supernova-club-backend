const connection = require("../../db");

exports.crear = async ({
    id_usuario,
    id_deporte,
    fecha,
    hora_inicio,
    hora_fin
}) => {

    const query = `
        INSERT INTO reservas
        (
            id_usuario,
            id_deporte,
            fecha,
            hora_inicio,
            hora_fin,
            estado
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    await connection.query(query, [
        id_usuario,
        id_deporte,
        fecha,
        hora_inicio,
        hora_fin,
        "PENDIENTE"
    ]);

};