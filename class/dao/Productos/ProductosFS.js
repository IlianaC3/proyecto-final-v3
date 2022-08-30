const fs = require('fs');

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile; 
        this.productosArr = [];
    }

    async codeGenerator(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let index = 0; index < length; index++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
       }
       return result;
    }

    async findId(id) {
        return this.productosArr.find(obj => obj.id === parseInt(id))
    };

    async findIndex(id) {
        return this.productosArr.findIndex(obj => obj.id === parseInt(id))
    }

    async filterId(id) {
        return this.productsArr.filter(obj => obj.id !== id)
    }

    async save(product) {
        const findAll = await fs.promises.readFile(`./db/${this.nameFile}`, 'utf-8');
        this.productosArr = JSON.parse(findAll);
        let code = await this.codeGenerator(5);
        let id = this.productosArr.length > 0 ? this.productosArr[this.productosArr.length-1].id + 1 : 1;
        if (this.productosArr.length > 0) {
            let objectWithId = {
                id: id,
                code: code,
                timestamp: new Date(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock
            }
            this.productosArr.push(objectWithId);
        } else {
            this.productosArr = [{
                id: id,
                code: code,
                timestamp: new Date(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock
            }]
        }
        try {
            await fs.promises.writeFile(`./db/${this.nameFile}`, JSON.stringify(this.productosArr, null, 2), 'utf-8');
            return `Producto guardado con id: ${id}`
        } catch (e) {
            return `No se pudo guardar el producto`;
        }
    }

    async getById(id) {
        try {
            let findId = await fs.promises.readFile(`${__dirname}/db/${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            let result = await this.findId(id);
            return result === undefined ? null : result;
        } catch {
            return "Error al leer archivo";
        }
    }

    async getAll() {
        try {
            let findId = await fs.promises.readFile(`./db/${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            return this.productosArr;
        } catch {
            return "Error al leer arreglo";
        }
    }

    async updateById(id, product) {
        try {
            let findId = await fs.promises.readFile(`./db/${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            let result = await this.findIndex(id);
            if (result > -1) {
                this.productosArr[result].title = product.title;
                this.productosArr[result].price = product.price;
                this.productosArr[result].thumbnail = product.thumbnail;
                this.productosArr[result].description = product.description;
                this.productosArr[result].stock = product.stock;
                try {
                    await fs.promises.writeFile(`./db/${this.nameFile}`, JSON.stringify(this.productosArr, null, 2), 'utf-8');
                    return `Producto editado con id: ${id}`
                } catch (e) {
                    return `No se pudo guardar el producto`;
                }
            } else{
                return "No existe el producto"
            }
        } catch {
            return "Error al ejecutar acción";
        }
    }

    async deleteById(id) {
        try {
            console.log("este es el id", id);
            let findId = await fs.promises.readFile(`./db/${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            console.log(this.productosArr);
            let result = await this.findIndex(id);
            if (result > -1) {
                this.productosArr.splice(result, 1);
                try {
                    let saveData = await fs.promises.writeFile(`./db/${this.nameFile}`, JSON.stringify(this.productosArr, null, 2), 'utf-8');
                    return `Producto eliminado con id: ${id}`
                } catch (e) {
                    return `No se pudo eliminar el producto`;
                }
            } else {
                return `El producto con ID ${id} no existe`
            }
        } catch {
            return "Error al eliminar producto"
        }
    }
}



module.exports = Contenedor;