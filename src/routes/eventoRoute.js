const express = require ('express');
const router = express.Router ();

//Llamamos al controlador
const eventoController = require ("../controllers/eventoController");

router.get("/eventos", eventoController.index);
router.get ("/eventos/:ID", eventoController.show);
router.post ("/eventos", eventoController.store); //post para agregar un registr nuevo.
router.put("/eventos/:ID", eventoController.update) //modificar un registro

//aca ponermos router.post router.delete etc...

module.exports = router;