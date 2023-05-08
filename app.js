const express = require('express');
const app = express();
const cors = require('cors');
//ROUTES
const user_routes = require('./routes/user.routes');
const categoria_routes = require('./routes/categoria.routes');

require('./db');

app.use(cors());
app.use(express.json());
//app.use('/api', require('./routes/user.routes'));

app.listen(3000);
console.log('Server on port', 3000);


app.use('/api', user_routes);
app.use('/api', categoria_routes);

module.exports = app;