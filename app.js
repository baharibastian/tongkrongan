const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Models
const models = require('./models');
models.sequelize.sync().then(function(){
	console.log('Nice! Database looks fine');
}).catch(function(err){
	console.log(err, "Something went wrong")
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./routes')(app);
app.get('/', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of nothingness.',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;