var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleVenta');
var Producto = require('../models/producto');

function registrar(req,res){

    let data= req.body;
    var venta = new Venta();
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    venta.save((err, venta_save)=>{
        if(venta_save){
            let detalles = data.detalles;

            detalles.forEach((element,index)=> {
                var detalleVenta = new DetalleVenta();
                detalleVenta.idproducto = element.idproducto;
                detalleVenta.cantidad = element.cantidad;
                detalleVenta.venta = venta_save._id;

                detalleVenta.save((err,detalle_save)=>{
                    if(detalle_save){
                        Producto.findById({_id:element.idproducto},(err,producto_data)=>{
                            if(producto_data){
                                Producto.findByIdAndUpdate({_id:producto_data._id},{stock: parseInt(producto_data.stock) - 
                                    parseInt(element.cantidad)},(err,producto_edit)=>{
                                        res.end();
                                    })
                            }else{
                                res.send('No se encontró el producto');
                            }
                        });
                    }else{
                        res.send('No se pudo registrar los datos');
                    }
                })
            });
        }else{
            res.send('No se pudo registrar los datos');
        }
    });

}

module.exports = {
    registrar
}