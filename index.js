const http = require('http');
require('dotenv').config();
const cluster = require('cluster');
const express = require('express');
const os = require('os');
const app = express();
const util = require('util');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 8080;

const passport = require('./utils/passport')
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({limit: '10mb'}))

app.set('view engine', 'ejs');
app.set('views', './public');

//SESSION
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: 600000
	}
 }))

app.use(passport.initialize());
app.use(passport.session());

const routes_user = require('./routes/routes_user');
app.use("/api/user", routes_user);

const routes_productos = require('./routes/routes_productos');
app.use("/api/productos", routes_productos);

const routes_carritos = require('./routes/routes_carrito');
app.use("/api/carrito", routes_carritos);

const routes_front = require('./routes/routes_front');
app.use('', routes_front)

const server = http.createServer(app);

server.listen(port, () => {
   console.log(`Aplicación ejecutandose en el puerto: ${port}`);
});
