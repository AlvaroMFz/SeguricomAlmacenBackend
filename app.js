const express = require('express');
const app = express();
const cors = require('cors');
//ROUTES
const user_routes = require('./routes/user.routes');
const categoria_routes = require('./routes/categoria.routes');
const producto_routes = require('./routes/producto.routes');

require('./db');

app.use(cors());
app.use(express.json());
//app.use('/api', require('./routes/user.routes'));

app.listen(3000);
console.log('Server on port', 3000);



app.use((req,res ,next) => {
    res.header ("Content -Type: application/json");
    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Acesss-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET', 'PUT', 'POST', 'DELETE', 'OPTIONS');
    next();
});
app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);

module.exports = app;