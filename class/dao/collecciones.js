const mongoose = require('mongoose')
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const Connections = require("../../config");

const firebaseInit = initializeApp({
    credential: cert(Connections.firebase)
})

let db = getFirestore();

const collProdFirebase = db.collection('productos');
const collCarFirebase = db.collection('carrito');

const collProducto = mongoose.model('productos', {
    code: { type: String, required: true },
    timestamp: { type : Date, default: Date.now, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

const collCarrito = mongoose.model('carritos', {
    timestamp: { type: Date, default: new Date(), required: true },
    user: { type: String, required: true },
    comprado: { type: Boolean, required: true },
    productos: { type: [], required: true }
});

const collUsuarios = mongoose.model('usuarios', {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    foto: { type: String, required: true },
    password: { type: String, required: true }
});




module.exports = {collProducto, collCarrito, collUsuarios, firebaseInit, collCarFirebase, collProdFirebase}