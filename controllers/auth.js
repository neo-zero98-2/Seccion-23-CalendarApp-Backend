const { response, request } = require('express');
const Usuario = require('../models/Usuario.model');
const bcrypt = require('bcrypt');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async(req = request, res = response) => {

    try {

        const { email, password } = req.body;
        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: "Un usuario ya existe con ese email"
            });
        }
        usuario = Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        
        const token = await generarJwt(usuario.id, usuario.name);

        return res.status(200).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Favor de hablar con el administrador del sistema'
        })
    }
}

const loginUsuario = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: 'usuario o contraseña incorrectos'
            });
        }
    
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'usuario o contraseña incorrectos'
            });
        }

        const token = await generarJwt(usuario.id, usuario.name);

        return res.status(200).json({
            ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error en login, favor de contactar con administrador"
        })
    }


    
}

const revalidarToken = async (req = request, res = response) => {
    const { uid, name } = req; 
    
    try {
        const token = await generarJwt(uid, name);
        return res.status(200).json({
            ok: true,
            uid, name,
            token
        })
    } catch (error) {
        console.log("error ", error);
        return res.status(401).json({
            ok: false,
            msg: 'Error al autenticar, favor de contactar con administrador'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}