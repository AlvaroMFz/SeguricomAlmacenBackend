



function datos_venta(req,res){
    var id = req.params['id'];

    Venta.findById(id, (err,data_venta)=>{
        if(data_venta){
            Detalle.find({idventa:id},(err, data_detalle)=>{
                if(data_detalle){
                    res.status(200).send(
                        {
                            venta: data_venta,
                            detalles: data_detalle
                        }
                    )
                }
            })
        }
    }) 

}

module.exports = {
    registrar,
    datos_venta,
}