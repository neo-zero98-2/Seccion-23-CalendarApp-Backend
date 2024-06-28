const { Router } = require("express");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validaJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validadorCampos } = require("../middlewares/validador-campos");
const { isDate } = require("../helpers/isDate");

/**
 * * Rutas de usuarios
 * * host + /api/events
 */

const router = Router();


// un midleware que manda a traer validaJWT. validaJWT se ejecuta en todas las rutas

router.use(validaJWT);  // todo lo que esta debajo de esta instruccion se ejecutara como si fuera un midleware

router.get('/', getEventos);

router.post('/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio no es valida').custom(isDate),
        check('end', 'La fecha de fin no es valida').custom(isDate),
        validadorCampos
    ],
    crearEvento);

router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio no es valida').custom(isDate),
        check('end', 'La fecha de fin no es valida').custom(isDate),
        validadorCampos
    ], 
    actualizarEvento);

router.delete('/:id', eliminarEvento);

module.exports = router;

