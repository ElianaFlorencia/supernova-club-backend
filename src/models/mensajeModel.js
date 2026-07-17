const connection = require("../../db");

exports.crear = async ({
    id_usuario,
    nombre,
    email,
    asunto,
    mensaje
}) => {

    const query = `
        INSERT INTO mensajes
        (
            id_usuario,
            nombre,
            email,
            asunto,
            mensaje
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    await connection.query(query, [
        id_usuario,
        nombre,
        email,
        asunto,
        mensaje
    ]);

};