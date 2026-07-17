const connection = require('../../db');


exports.obtenerTodos = async () => {

    const query = `
        SELECT 
            id,
            nombre,
            descripcion,
            activo
        FROM deportes
        WHERE activo = 1
    `;

    const [rows] = await connection.query(query);

    return rows;

};

exports.crear = async ({nombre, descripcion, activo}) => {

    const query = `
        INSERT INTO deportes(nombre, descripcion, activo)
        VALUES (?, ?, ?)
    `;

    await connection.query(query, [
        nombre,
        descripcion,
        activo
    ]);

};


exports.actualizar = async (id, deporte) => {

    const query = `
        UPDATE deportes
        SET 
            nombre = ?,
            descripcion = ?,
            activo = ?
        WHERE id = ?
    `;

    await connection.query(query, [
        deporte.nombre,
        deporte.descripcion,
        deporte.activo,
        id
    ]);

};


exports.eliminar = async (id) => {

    const query = `
        DELETE FROM deportes
        WHERE id = ?
    `;

    await connection.query(query, [id]);

};