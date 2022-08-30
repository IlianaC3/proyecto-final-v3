const express = require('express');
require('dotenv').config();
let productosDao
let carritosDao
let usuariosDao //Sólo Configuración Mongo Atlas

let dataB = process.env.DAO || 'mongodbAtlas'

switch (dataB) {
    case 'json':
        const ProductosFS = require('./dao/Productos/ProductosFS')
        const CarritoFS = require('./dao/Carritos/CarritoFS')
        const UsuariosDaoFS = require('./dao/Usuarios/Usuarios')
        productosDao = new ProductosFS('productos.json')
        carritosDao = new CarritoFS('carrito.json')
        usuariosDao = new UsuariosDaoFS()
        break
    case 'firebase':
        const ProductosFirebase = require('./dao/Productos/ProductosFirebase')
        const CarritosFirebase = require('./dao/Carritos/CarritoFirebase')
        const UsuariosDaoFire = require('./dao/Usuarios/Usuarios')
        productosDao = new ProductosFirebase()
        carritosDao = new CarritosFirebase()
        usuariosDao = new UsuariosDaoFire()
        break
    case 'mongodb':
        const ProductosMongo = require('./dao/Productos/ProductosMongo')
        const CarritosMongo = require('./dao/Carritos/CarritoMongo')
        const UsuariosDaoM = require('./dao/Usuarios/Usuarios')
        productosDao = new ProductosMongo()
        carritosDao = new CarritosMongo()
        usuariosDao = new UsuariosDaoM()
        break
    case 'mongodbAtlas':
        const ProductosMongoA = require('./dao/Productos/ProductosMongo')
        const CarritosMongoA = require('./dao/Carritos/CarritoMongo')
        const UsuariosDaoA = require('./dao/Usuarios/Usuarios')
        productosDao = new ProductosMongoA()
        carritosDao = new CarritosMongoA()
        usuariosDao = new UsuariosDaoA()
        break
    default:
        const ProductosM = require('./dao/Productos/ProductosM')
        const CarritosM = require('./dao/Carritos/CarritoM')
        const UsuariosDaoMD = require('./dao/Usuarios/Usuarios')
        productosDao = new ProductosM()
        carritosDao = new CarritosM()
        usuariosDao = new UsuariosDaoMD()
        break
}

module.exports = { productosDao, carritosDao, usuariosDao }