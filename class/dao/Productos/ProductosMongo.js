const mongoose = require('mongoose')
const Connections = require("../../../config");
const { collProducto } = require('../collecciones')
const { parseJSON , renameField, removeField } = require('../../../utils/fields');

class Contenedor {
    constructor() {
        this.coleccion = collProducto 
    }

    async main() {
        await mongoose.connect(Connections.mongodbU.cnxStr, Connections.mongodbU.options);
    }

    async codeGenerator(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let index = 0; index < length; index++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
       }
       return result;
    }

    async save(product) {
        try {
            this.main();
            let code = await this.codeGenerator(5);
            let object = {
                code: code,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock
            }
            let doc = await this.coleccion.create(object);
            doc = parseJSON(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return "Producto guardado con el id " + doc.id
        } catch(error) {
            return "Error al leer archivo" + error;
        }
    }

    async getById(id) {
        try {
            this.main();
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            if (docs.length == 0) {
               return 'Error al listar por id: no encontrado'
            } else {
                const result = renameField(parseJSON(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            return `Error al listar por id: ${error}`
        }
    }

    async getAll() {
        try {
            this.main();
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
            } catch (error) {
                return `Error al listar todo: ${error}`
            }
    }

    async updateById(id, product) {
        try {
            this.main();
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, product)
            if (n == 0 || nModified == 0) {
                return 'Error al actualizar: no encontrado';
            } else {
                renameField(product, '_id', 'id')
                removeField(product, '__v')
                return `Producto eliminado con id: ${id}`
            }
        } catch (error) {
            return `Error al actualizar: ${error}`
        }
    }

    async deleteById(id) {
        try {
            this.main();
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                return 'Error al borrar: no encontrado'
            } else {
                return `Producto eliminado con id: ${id}`
            }
        } catch (error) {
            return `Error al borrar: ${error}`
        }
    }
}



module.exports = Contenedor;