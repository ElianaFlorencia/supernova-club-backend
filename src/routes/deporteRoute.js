const express = require("express");
const router = express.Router();

const deporteController = require("../controllers/deporteController");
const { requireAuth } = require("../middlewares/auth");
const { requireAdmin } = require("../middlewares/isAdmin");

router.get(
    "/deportes",
    deporteController.obtenerDeportes
);


// Crear deporte (solo admin)
router.post(
    "/deportes",
    requireAuth,
    requireAdmin,
    deporteController.crearDeporte
);


// Editar deporte (solo admin)
router.put(
    "/deportes/:id",
    requireAuth,
    requireAdmin,
    deporteController.actualizarDeporte
);


// Eliminar deporte (solo admin)
router.delete(
    "/deportes/:id",
    requireAuth,
    requireAdmin,
    deporteController.eliminarDeporte
);

module.exports = router;