const usuarioModel = require ("../models/usuarioModel");
const jwt = require ("jsonwebtoken");

exports.register = async(req, res) => {
   // const nombre = req.body.nombre; // me devuelve lo q el usuario haya ingresado (otra forma de escribir la linea de abajo)
    const {nombre, apellido, email, contrasena, numero_socio, is_admin} = req.body; //contr q nos manda el usuario
    try{
        await usuarioModel.create ({nombre, apellido, email, contrasena, numero_socio, is_admin});
        res.json ({success: true, message: 'Usuario registrado correctamente'});
    }catch (error){
        console.log (error);
        res.status (500).json ({success: false, message: 'Error al intentar registrar el usuario'});
    }
}

exports.login = async(req, res) => {
    const {email, contrasena} =req.body;

    try{
        const usuario = await usuarioModel.login ({email, contrasena});
        if (usuario == null){
            res.json ({success: false, message: 'Credenciales incorrectas'});

        }else{
         //informacion que se va a hashear.
         const playload = {
            ID: usuario.id, 
            nombre: usuario.nombre, 
            is_admin: (usuario.is_admin == '1')
        };
         //access token.
         const accessToken = jwt.sign (
            playload, 
            process.env.JWT_ACCESS_TOKEN_SECRET, 
            {expiresIn: '15m'}
        );
         
        const refreshToken= jwt.sign (
            playload,
            process.env.JWT_REFRESH_TOKEN_SECRET,
            {expiresIn: '7d'}
        );

        res.json ({
            success: true,
            message: 'Inicio de sesion exitoso',
            //nombre: usuario.nombre,
            accessToken,
            refreshToken,
         });
    
        }
    }catch (error){
        console.log (error);
        res.status (500).json ({success: false, message: 'Error al intentar iniciar sesion'});
    }
}

//Ruta protegida
exports.welcome = (req, res) => {
    res.json ({success: true, message:'Bienvenida/o ' + req.user.nombre});
}

exports.refreshToken = (req, res) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "No se proporcionó el refresh token"
        });
    }

    const refreshToken = authorization.split(" ")[1];

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        (error, user) => {

            if (error) {
                return res.status(403).json({
                    success: false,
                    message: "Refresh token inválido"
                });
            }

            const playload = {
                ID: user.ID,
                nombre: user.nombre,
                is_admin: user.is_admin
            };

            const accessToken = jwt.sign(
                playload,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            res.json({
                success: true,
                accessToken
            });
        }
    );
};

exports.obtenerUsuarios = async (req, res) => {
   console.log("LLEGÓ AL CONTROLADOR USUARIOS");
    try {

        const usuarios = await usuarioModel.obtenerTodos();
         console.log("USUARIOS:", usuarios);
        res.json({
            success: true,
            usuarios
        });

    } catch(error){

          console.log("ERROR MODELO:", error);

        res.status(500).json({
            success:false,
            message:"Error al obtener usuarios"
        });

    }

};

exports.eliminarUsuario = async (req, res) => {

    const { id } = req.params;

    try {

        await usuarioModel.eliminar(id);

        res.json({
            success: true,
            message: "Usuario eliminado correctamente"
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al eliminar usuario"
        });
    }
};


exports.actualizarUsuario = async (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        apellido,
        email,
        contrasena,
        numero_socio,
        is_admin
    } = req.body;


    try {

        await usuarioModel.actualizar(id, {
            nombre,
            apellido,
            email,
            contrasena,
            numero_socio,
            is_admin
        });


        res.json({
            success:true,
            message:"Usuario actualizado correctamente"
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al actualizar usuario"
        });
    }
};

/*
exports.crearUsuario = async(req, res) => {

    const {nombre, apellido, email, contrasena, numero_socio, is_admin} = req.body;

    try {

        await usuarioModel.create({
            nombre,
            apellido,
            email,
            contrasena,
            numero_socio,
            is_admin
        });

        res.json({
            success:true,
            message:"Usuario creado correctamente"
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Error al crear usuario"
        });
    }
}; */