const { collProdFirebase } = require('../collecciones')

class Contenedor {
    constructor() {
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
            let code = await this.codeGenerator(5);
            let object = {
                code: code,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock
            }
            let doc = await collProdFirebase.add(object);
            return "Producto guardado con el id " + doc.id
        } catch(error) {
            return "Error al leer archivo" + error;
        }
    }

    async getById(id) {
        try {
            let doc = await collProdFirebase.doc(id).get();
            if (!doc.exists) {
                return `Error al listar por id: no se encontró`
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch {
            return "Error al leer archivo";
        }
    }

    async getAll() {
        try {
            let result = []
            const prodcutos = await collProdFirebase.get();
            prodcutos.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch {
            return "Error al leer arreglo";
        }
    }

    async updateById(id, product) {
        try {
            const updateProd = await collProdFirebase.doc(id).set(product);
            return `Producto con id ${id} editado`;
        } catch {
            return "Error al ejecutar acción";
        }
    }

    async deleteById(id) {
        try {
            const deleteProd = await collProdFirebase.doc(id).delete();
            return `El producto con ID ${id} eliminado`
        } catch {
            return "Error al eliminar producto"
        }
    }
}



module.exports = Contenedor;