/**
 * * Rutas de usuarios
 * * host + /api/auth
 */

const { Router } = require('express');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validadorCampos } = require('../middlewares/validador-campos');
const { validaJWT } = require('../middlewares/validar-jwt');

// crea un usuario
router.post(
    '/new',
    [ // midlewares
        check("name", "El campo nombre es obligatorio").notEmpty(),
        check("name", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
        check("email", "El email no es valido").isEmail(),
        check("password", "El password debe ser de al menos 8 caracteres").isLength({ min: 8 }),
        validadorCampos
    ],
    crearUsuario
);

// login usuario
router.post(
    '/', 
    [ //midlewares
        check("email", "El email no es valido").isEmail(),
        check("password", "el password debe ser de al menos 8 caracteres").isLength({ min: 8 }),
        validadorCampos
    ],
    loginUsuario
); 

//revalidar el token
router.get('/renew', validaJWT, revalidarToken); 

module.exports = router;