const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middlewares/auth");
const mensajeController = require("../controllers/mensajeController");


router.post(
    "/mensajes",
    requireAuth,
    mensajeController.crearMensaje
);


module.exports = router;
