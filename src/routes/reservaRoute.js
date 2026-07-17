const express = require("express");
const router = express.Router();

const { requireAuth } = require("../middlewares/auth");
const reservaController = require("../controllers/reservaController");

router.post(
    "/reservas",
    requireAuth,
    reservaController.crearReserva
);

module.exports = router;