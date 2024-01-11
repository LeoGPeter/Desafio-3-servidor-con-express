import {promises as fs} from "fs"

export class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
       let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        id = parseInt(id);
        if(!respuesta3.find((product) => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
            let respuesta3 = await this.readProducts();
            let productfilter = respuesta3.filter(products => products.id != id);
            await fs.writeFile(this.patch, JSON.stringify(productfilter));
            console.log("Producto eliminado");
    };

    updateProduct = async ({id, ...updatedFields}) => {
        let products = await this.readProducts();
        const index = products.findIndex(product => product.id === id);
    
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            await fs.writeFile(this.patch, JSON.stringify(products));
            console.log("Producto actualizado");
        } else {
            console.log("Producto no encontrado");
        }
    };
}

const productos = new ProductManager();

productos.addProduct("Remera", "overside negra", 25000, "img1", "asd123", 18);
productos.addProduct("Pantalon", "Cargo verde", 35000, "img2", "asd456", 15);
productos.addProduct("Remera", "overside blanca", 26000, "img3", "asd678",10);
productos.addProduct("Buzo", "overside negro", 45000, "img4", "zxc948",17);
productos.addProduct("Remera", "overside gris", 26000, "img5", "sdg675",16);
productos.addProduct("Buzo", "overside gris", 42000, "img6", "sdc483",18);
productos.addProduct("Musculosa", "overside negra", 25000, "img7", "yui234",15);
productos.addProduct("Pantalon", "cargo arena", 35000, "img8", "bnm789",13);
productos.addProduct("Pantalon", "cargo negro", 35000, "img9", "xcb236",13);
productos.addProduct("Buzo", "Blanco", 40000, "img10", "fgf567",13);

// productos.getProducts()

//  productos.getProductsById(4)

//  productos.deleteProductsById(1)

// productos.updateProduct({
//   price: 26000,
//   stock: 15,
//   id:1
  
// })