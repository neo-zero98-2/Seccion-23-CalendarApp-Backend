const { request, response } = require("express");
const Evento = require("../models/Evento.model");

const getEventos = async (req = request, res = response) => {

    const eventos = await Evento.find()
                        .populate("user", "name"); // manda a traer la referencia es decir el evento con el usuario del evento

    return res.status(200).json({
        ok: true,
        eventos
    });
}

const crearEvento = async(req = request, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        return res.status(200).json({
            ok: true,
            evento: eventoGuardado 
        })
    } catch (error) {
        console.log("error , error");
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req = request, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'no se encontro el id de evento'
            });
        }

        if(uid !== evento.user.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }; 

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new: true }); //actualiza el evento y devuelve el objeto actualizado

        return res.status(200).json({
            ok: true,
            msg: 'evento actualizado',
            evento: eventoActualizado
        });


    } catch (error) {
        console.log("error ", error); 
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarEvento = async (req = request, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventId);
        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'no se encontro el id de evento'
            });
        }

        if(uid !== evento.user.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        await evento.deleteOne();

        return res.status(200).json({
            ok: true,
            msg: 'evento eliminado'
        });

    } catch (error) {
        console.log("error ", error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}