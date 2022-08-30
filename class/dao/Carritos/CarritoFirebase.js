const { collCarFirebase, collProdFirebase } = require('../collecciones')

class Contenedor {
    constructor() {
    }

    async findCarrito() {
        try {
            let result = []
            const prodcutos = await collCarFirebase.get();
            prodcutos.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch {
            return "Error al leer archivo";
        }
    }

    async save(product) {
        try {
            const Producto = await collProdFirebase.doc(product.id_prod).get();
            const data = Producto.data();
            let newPr = {
                code: data.code,
                title: data.title,
                description: data.description,
                price: data.price,
                stock: data.stock,
                thumbnail: data.thumbnail,
                id: product.id_prod
            }
            let object = {
                timestamp: new Date(),
                productos: [newPr]
            }
            let doc = await collCarFirebase.add(object);
            
            return "Carrito guardado con el id " +doc.id
        } catch(error) {
            return "Error al leer archivo" + error;
        }
    }

    async deleteById(id) {
        try {
            const deleteCar = await collCarFirebase.doc(id).delete();
            return `El carrito con ID ${id} eliminado`
        } catch {
            return "Error al eliminar carrito"
        }
    }

    async getProductsById(id) {
        try {
            let doc = await collCarFirebase.doc(id).get();
            if (!doc.exists) {
                return `Error al listar por id: no se encontró`
            } else {
                const data = doc.data();
                return data.productos
            }
        } catch {
            return "Error al leer archivo";
        }
    }

    async addProductsById(id, product) {
        try {
            // console.log(product)
            let newArray = [];
            const docs = await collCarFirebase.doc(id).get();
            const data = docs.data();
            // console.log(data)
            const Producto = await collProdFirebase.doc(product.id_prod).get();
            const dataO = Producto.data();
            // console.log(dataO)
            let newPr = {
                code: dataO.code,
                title: dataO.title,
                description: dataO.description,
                price: dataO.price,
                stock: dataO.stock,
                thumbnail: dataO.thumbnail,
                id: product.id_prod
            }
            
            newArray = data.productos;
            newArray.push(newPr);
            let carritoU = {
                productos: newArray
            }
            const updateProd = await collCarFirebase.doc(id).set(carritoU);

            return `Carrito con id ${id} editado`;
        } catch {
            return "Error al ejecutar acción";
        }
    }

    async deleteProductById(id, id_prod) {
        try {
            console.log(id, id_prod)
            let newArray = [];
            const docs = await collCarFirebase.doc(id).get();
            const data = docs.data();
            newArray = data.productos;
            let index = newArray.find(obj => obj.id == id_prod);
            newArray.splice(index, 1);;
            let carritoU = {
                productos: newArray
            }
            const updateProd = await collCarFirebase.doc(id).set(carritoU);
            return `Carrito con id ${id} editado`;
        } catch {
            return "Error al ejecutar acción";
        }
    }

}

module.exports = Contenedor;