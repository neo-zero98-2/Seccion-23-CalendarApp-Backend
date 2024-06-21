const { response, request } = require('express');
const { validationResult } = require('express-validator');

// middleware personalizado
const validadorCampos = (req = request, res = response, next) => {
    // console.log("req ", req.body);
    // manejo de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errores.array()
        });
    }
    next();
}

module.exports = {
    validadorCampos
}