var DetalleVisita = require('../models/DetalleVisita');
var DetalleCotizacion = require('../models/detalleCotización');
var Cliente = require('../models/client');
const DetalleEstudio = require('../models/DetalleEstudio');

function RegistrarDetalleVisita(req,res){
    const { idCliente } = req.params;
    try {
        const {
            detalle_1,
            detalle_2,
            detalle_3,
            detalle_4,
            detalle_5,
            detalle_6,
        } = req.body;
    
        const detallevisita = new DetalleVisita({
            detalle_1,
            detalle_2,
            detalle_3,
            detalle_4,
            detalle_5,
            detalle_6,
            cliente: idCliente
        });

        detallevisita.save();
        res.status(200).json({detallevisita: detallevisita})
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
function RegistrarCotizacion(req,res){
     const { idCliente } = req.params;
    try {
        const {
            descripcion,
            precioUnitario,
            cantidad,
            impuestos,
            descuentos,
            total
        } = req.body;
    
        const detallecotizacion = new DetalleCotizacion({
            descripcion,
            precioUnitario,
            cantidad,
            impuestos,
            descuentos,
            total,
            cliente: idCliente
        });

        detallecotizacion.save();
        res.status(200).json({detallecotizacion: detallecotizacion})
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

function ObtenerCotizaciones (req,res){

        DetalleCotizacion.find((err,cotizacion_data) =>{
        if(cotizacion_data){
            res.status(200).send({cotizacion:cotizacion_data})
        }else{
            res.status(404).json({msg: 'No se encontró la cotización'})
        }
        });
    
}

function ObtenerCotizacionesID(req, res){
    const { idCotizacion } = req.params;
    DetalleCotizacion.findById(idCotizacion,(err,cotizacion_data) =>{
    if(cotizacion_data){
        res.status(200).send({cotizacion:cotizacion_data})
    }else{
        res.status(404).json({msg: 'No se encontró la cotización'})
    }
    });
    }

function ObtenerDetalleCliente(req, res){
    const { idCliente } = req.params;
    Cliente.findById(idCliente, (err, cliente_data) => {
        if (cliente_data.rol == "4") {
            const clientesJSON = JSON.parse(JSON.stringify(cliente_data));
                res.status(200).json({ clientes: clientesJSON });
            // res.status(200).json({
            //     nombre: cliente_data.nombre,
            //     apellido: cliente_data.apellido,
            //     direccion: cliente_data.direccion,
            // })
        } else {
            // res.status(500).json({msg: err.msg})
            res.status(500).json({msg: "No tiene el rol de cliente"})
        }
    })
}

module.exports = {
RegistrarDetalleVisita,
RegistrarCotizacion,
ObtenerCotizacionesID,
ObtenerCotizaciones,
ObtenerDetalleCliente
}