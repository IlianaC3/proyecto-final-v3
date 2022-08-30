const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { usuariosDao } = require('../class/index');

passport.use('registration', new LocalStrategy((username, password, callback) => {
	let usuario = {
		email: username,
		password: password
	}
	usuariosDao.checkUser(username).then((result) => {
		// console.log(result);
		if (result === true) {
			callback(null, { data: -1 });
		} else {
			callback(null, usuario );
		}
	});
}));

passport.use('authentication', new LocalStrategy((username, password, callback) => {
    let usuario = {
		email: username,
		password: password
	}
    usuariosDao.loginUser(usuario).then((result) => {
		// console.log(result)
        if (result === undefined) {
			callback(null, { email: -1 });
		} else if (result === null) {
			callback(null, { email: 0 });
		} else {
			callback(null, result)
		}
    });
}));

passport.serializeUser((usuario, callback) => {
	// console.log("suario", usuario)
  	callback(null, usuario);
});

passport.deserializeUser((username, callback) => {
//   console.log("username", username)
  callback(null, username);
});

module.exports = passport;