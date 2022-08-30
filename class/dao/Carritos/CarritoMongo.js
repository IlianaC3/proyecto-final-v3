const mongoose = require('mongoose')
const Connections = require("../../../config");
const { collCarrito, collProducto, collUsuarios } = require('../collecciones')
const { parseJSON , renameField, removeField } = require('../../../utils/fields');

const nodemailer = require('../../../utils/nodemailer')

class Contenedor {
    constructor() {
        this.coleccion = collCarrito
    }

    async main() {
        await mongoose.connect(Connections.mongodbU.cnxStr, Connections.mongodbU.options);
    }

    async findCarrito(user, comprado) {
        try {
            this.main();
            let docs = await this.coleccion.find({ 'user': `${user}`, 'comprado': comprado}, { __v: 0 }).lean();
            console.log(docs)
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'));
            
            let result = docs[0]
            console.log(result)
            return result === undefined ? null : [ result ]
        } catch {
            return "Error al leer archivo";
        }
    }

    async save(product, user) {
        try {
            this.main();
            const Producto = await collProducto.find({ '_id': product.id_prod }, { __v: 0 })
            let newPr = {
                code: Producto[0].code,
                title: Producto[0].title,
                description: Producto[0].description,
                price: Producto[0].price,
                stock: Producto[0].stock,
                thumbnail: Producto[0].thumbnail,
                timestamp: Producto[0].timestamp,
                id: Producto[0]._id
            }
            let object = {
                timestamp: new Date(),
                user: user.email,
                comprado: false,
                productos: [newPr]
            }
            let doc = await this.coleccion.create(object);
            doc = parseJSON(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return "Carrito guardado con el id " + doc.id
        } catch(error) {
            return "Error al leer archivo" + error;
        }
    }

    async deleteById(id, user) {
        try {
            this.main();
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id, 'user': `${user}`})
            if (n == 0 || nDeleted == 0) {
                return 'Error al borrar: no encontrado'
            } else {
                return `Carrito eliminado con id: ${id}`
            }
        } catch (error) {
            return `Error al borrar: ${error}`
        }
    }

    async getProductsById(id, user) {
        try {
            this.main();
            const docs = await this.coleccion.find({ '_id': id, user: `${user}`}, { __v: 0 })
            if (docs.length == 0) {
               return 'Error al listar por id: no encontrado'
            } else {
                const result = renameField(parseJSON(docs[0]), '_id', 'id')
                return result.productos
            }
        } catch (error) {
            return `Error al listar por id: ${error}`
        }
    }

    async addProductsById(id, product, user) {
        try {
            this.main();
            let newArray = [];
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            const Producto = await collProducto.find({ '_id': product.id_prod }, { __v: 0 })
            let newPr = {
                code: Producto[0].code,
                title: Producto[0].title,
                description: Producto[0].description,
                price: Producto[0].price,
                stock: Producto[0].stock,
                thumbnail: Producto[0].thumbnail,
                timestamp: Producto[0].timestamp,
                id: Producto[0]._id
            }
            newArray = docs[0].productos;
            newArray.push(newPr);
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, {'productos': newArray, 'comprado': false, 'timestamp': new Date(), 'user': `${user}`})
            if (n == 0 || nModified == 0) {
                return 'Error al actualizar: no encontrado';
            } else {
                renameField(product, '_id', 'id')
                removeField(product, '__v')
                return `Carrito editado con id: ${id}`
            }
        } catch {
            return "Error al ejecutar acción";
        }
    }

    async deleteProductById(id, id_prod, user) {
        try {
            this.main();
            let newArray = [];
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            newArray = docs[0].productos;
            let index = newArray.find(obj => obj.id == id_prod);
            newArray.splice(index, 1);
            console.log("nuevo array", newArray);
            const { n, nModified, nDeleted } = newArray.length == 0 ? await this.coleccion.deleteOne({ '_id': id, 'user': `${user}`}) : await this.coleccion.replaceOne({ '_id': id }, {'productos': newArray, 'comprado': false, 'timestamp': new Date(), 'user': `${user}`})
            if (n == 0 || nModified == 0 || nDeleted == 0) {
                return 'Error al actualizar: no encontrado';
            } else {
                return `Carrito editado con id: ${id}`
            }
        } catch (e) {
            console.log(e)
            return "Error al ejecutar acción";
        }
    }

    async comprarCarrito(id, user) {
        try {
            this.main();
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 });
            // console.log(docs)
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, {'productos': docs[0].productos, 'comprado': true, 'timestamp': new Date(), 'user': `${user[0].email}`})
            if (n == 0 || nModified == 0 ) {
                return 'Error al actualizar: no encontrado';
            } else {
                //OBJETO COMPRADO AHORA PROCEDO A ENVIAR CORREO Y MENSAJE
                //FUNCION CORREO
                const sendMail = await nodemailer.sendMailShop(docs, user)
                //FUNCION MENSAJE
                const sendMsgUser = await nodemailer.sendMsgShop(docs, user);
                const sendMsgAdmin = await nodemailer.sendMsgShopAdmin(user);


                return `Carrito editado con id: ${id}`
            }
        }  catch (e) {
            console.log(e)
            return "Error al ejecutar acción";
        }
        
       
    }

}

module.exports = Contenedor;