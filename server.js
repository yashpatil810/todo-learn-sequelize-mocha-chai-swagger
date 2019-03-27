const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express();
app.use(bodyParser.json())

var routes = require('./routes/routes');
app.use(cors());

app.use('/api', routes);

const port = 5001;

app.listen(port, () => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)),
    `Server started on port ${port}`
})

module.exports = app