const mongoose = require('mongoose');

// Usar este codigo si sale el error: "current URL string parser is deprecated"
// mongoose.connect('mongodb://localhost/angular-auth', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect('mongodb://127.0.0.1/SeguricomInventario',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));

/*const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err)=> {
    if(!err){
        console.log('Conexion a MongoDB exitosa');   
    }else{
        console.log('Error en conexion a MongoDB' + JSON.stringify(err, undefined, 2));
    }
});*/