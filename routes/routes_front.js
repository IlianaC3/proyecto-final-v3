const express = require('express');
const app = express();
const { publicAuthorization } = require('../utils/auth');
const phones = require('../utils/countryCodes.json')

const { carritosDao, productosDao, usuariosDao } = require('../class/index');

let arrayProd = [];

const functionProd = async function() {
   const productos = await productosDao.getAll();
   arrayProd = productos === null ? [] : productos;
}

const functionCar = async function (user, comprado) {
   const carritos = await carritosDao.findCarrito(user, comprado);
   console.log("se onbtienen los carritos ", carritos)
   return carritos === null ? [] : carritos;
}

const functionUsu = async function (user) {
   const usuarios = await usuariosDao.findUser(user);
   console.log("se obtienen los usuarios ", usuarios)
   return usuarios === null ? null : usuarios;
}

functionProd();

app.set('view engine', 'ejs');
app.set('views', './public');

let msg = '';

app.get('/', publicAuthorization, async (req, res) => {
   console.log(req.user)
   let user = req.user
   functionProd();
   const carrito = await functionCar(user.email, false);
   console.log("este el carrito ", carrito)
   res.render('index', {data: arrayProd, dataCar: carrito, user: user});
});

app.get('/carrito', publicAuthorization, async (req, res) => {
   // console.log(req.user)
   let user = req.user
   const carrito = await functionCar(user.email, false);
   console.log("este el carrito ", carrito)
   res.render('carrito', {data: carrito});
});

app.get('/usuario', publicAuthorization, async (req, res) => {
   // console.log(req.user)
   let user = req.user
   const usuario = await functionUsu(user.email);
   console.log("usuario para ver datos",  usuario)
   res.render('usuario', {data: usuario});
});

app.get('/administrador', (req, res) => {
   if (req.query.admin) {
      functionProd();
      res.render('admin', {data: arrayProd});
   } else {
      res.render('unauthorized', {data:{
         error : -1,
         descripcion: 'Ruta /admin método vista no autorizada'
      }})
   }
 });
 
 app.get('/agregar', (req, res) => {
   if (req.query.admin) {
      res.render('agregar');
   } else {
      res.render('unauthorized', {data:{
         error : -1,
         descripcion: 'Ruta /agregar método agregar no autorizada'
      }})
   }
 });
 
 app.get('/editar/:id', (req, res) => {
   if (req.query.admin) {
      functionProd();
      let index = arrayProd.findIndex(obj => obj.id == req.params.id)
      res.render('editar', {data: arrayProd[index]});
   } else {
      res.render('unauthorized', {data:{
         error : -1,
         descripcion: 'Ruta /editar método editar no autorizada'
      }})
   }
 });

 
// LOGIN //
app.get('/login', (req, res) => {
    const person = req.user;
    if (person) {
        res.redirect('/')
    } else {
        res.render('login');
    }
})

app.get('/logout', (req, res) => {
	req.logout(function(err) {
		if (err) { return next(err); }
    	res.render('logout');
	});
})

//REGISTRO
app.get('/signup',  (req, res) => {
    res.render('signup', { data: phones });
})

app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


 app.get(/^\/[A-Za-z0-9.-_/*]/, (req, res) => {
      msg = 'Ruta no encontrada',
      res.render('error', { data: msg })
 });

 module.exports = app;