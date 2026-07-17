const express = require ('express');
const router = express.Router ();
console.log("CARGANDO USUARIO ROUTE");
const {requireAuth} =require ("../middlewares/auth");

//Controlador
const usuarioController =require ("../controllers/usuarioController");
const { requireAdmin } = require('../middlewares/isAdmin');

router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);
router.get("/welcome", requireAuth, usuarioController.welcome);
//router.get("/usuarios", requireAuth, requireAdmin, usuarioController.obtenerUsuarios);
router.get("/refresh-token", usuarioController.refreshToken);
//Ruta para obtener info en Postman 
router.get( "/usuarios", requireAuth, requireAdmin,
    (req,res)=>{
        res.json({
            success:true,
            message:"Bienvenido administrador",
            usuario:req.user
        });
    }
);
// Ruta para traer todos los usuarios al frontend
router.get(
    "/usuarios/lista",
    requireAuth,
    requireAdmin,
    usuarioController.obtenerUsuarios
);

/*
router.post(
    "/usuarios",
    requireAuth,
    requireAdmin,
    usuarioController.crearUsuario
); */

router.delete(
    "/usuarios/:id",
    requireAuth,
    requireAdmin,
    usuarioController.eliminarUsuario
);

router.put(
    "/usuarios/:id",
    requireAuth,
    requireAdmin,
    usuarioController.actualizarUsuario
);

module.exports =router;