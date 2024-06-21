const { response, request } = require('express');
var jwt = require('jsonwebtoken');

const validaJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            ok: false,
            msg: 'el x-token no existe'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED); // verifica si el jwt es valido con la SECRET_JWT_SEED
        req.uid = payload.uid;
        req.name = payload.name;
    } catch (error) {
        console.log("err ", error);
        res.status(401).json({
            ok: false,
            msg: 'El token no es valido'
        })
    }
    next();
}

module.exports = {
    validaJWT
}