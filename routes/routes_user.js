const express = require('express');
const us = express();

const passport = require('../utils/passport')
us.use(express.json());
us.use(express.urlencoded());

us.use(passport.initialize());
us.use(passport.session());

us.set('view engine', 'ejs');
us.set('views', './public');

const { usuariosDao } = require('../class/index');

us.post('/login', passport.authenticate('authentication'), (req, res) => {
   let msg = '';
   if(req.user.email === -1) {
      msg = 'Usuario no existe';
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', {data: msg});
      });
   } else if (req.user.email === 0) {
      msg = 'Contraseña incorrecta';
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', {data: msg});
      });
   } else {
      res.redirect('/');
   }

})

us.post('/signup', passport.authenticate('registration'), (req, res) => {
   let msg = '';
   if(req.user.data === -1) {
      msg = 'El usuario ya existe'
      req.logout(function(err) {
         if (err) { return next(err); }
         res.render('error', {data: msg});
       });
   } else {
        let user = {
            email: req.body.username,
            nombre: req.body.name,
            password: req.body.password,
            direccion: req.body.address,
            telefono: `${req.body.prefix}${req.body.phone}`,
            edad: req.body.age,
            file: req.body.file
        }
        console.log("user a enviar", user)
        usuariosDao.save(user).then((result) => {
            req.logout(function(err) {
                if (result !== null) {
                    res.status(200).json({
                        message: `Usuario registrado`,
                        result: user
                    });
                } else {
                    res.status(201).json({
                        error: `No registrado`,
                    });
                }
            })
        });
   }
})

module.exports = us;