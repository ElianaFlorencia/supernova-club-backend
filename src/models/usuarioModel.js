const connection = require('../../db');

//Fechas
const {formatToday} = require ("../helpers/dateHelper");

const bcrypt =require ('bcrypt');

exports.create =async({nombre, apellido, email, contrasena, numero_socio, is_admin}) => {
    const contrasena_crypt = await bcrypt.hash(contrasena, 10);
    const query = `
          INSERT INTO usuarios (nombre, apellido, email, contrasena, numero_socio,  is_admin, fecha_creacion, fecha_modificacion)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
   try {
      await connection.query (query, [nombre, apellido, email, contrasena_crypt, numero_socio, (is_admin ? 1:0), formatToday(), formatToday()])
    }catch (error){
        throw error;
    }

}

exports.login = async ({email, contrasena}) => {
    const query = `
        SELECT id, nombre, apellido, email, numero_socio, contrasena, is_admin
        FROM usuarios
        WHERE email = ?
    `;
    try{
        [results] = await connection.query(query, [email]);
        //verificamos si encontró el usuario.
        if (results.length == 1){
            const usuario = results [0];
            const is_contrasena = await bcrypt.compare (contrasena, usuario.contrasena);
            return (is_contrasena) ? usuario : null;
        }else{
            return null;
        }
    }catch (error){
        throw error;
    }
}

exports.obtenerTodos = async () => {

    const query = `
        SELECT 
            id,
            nombre,
            apellido,
            email,
            numero_socio,
            is_admin,
            fecha_creacion
        FROM usuarios
    `;

    const [rows] = await connection.query(query);

    return rows;

};

exports.eliminar = async (id) => {

    const query = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    await connection.query(query, [id]);

};

exports.actualizar = async (id, usuario) => {

    const query = `
        UPDATE usuarios
        SET 
            nombre = ?,
            apellido = ?,
            email = ?,
            numero_socio = ?,
            is_admin = ?
        WHERE id = ?
    `;


    await connection.query(query, [
        usuario.nombre,
        usuario.apellido,
        usuario.email,
        usuario.numero_socio,
        usuario.is_admin,
        id
    ]);

};