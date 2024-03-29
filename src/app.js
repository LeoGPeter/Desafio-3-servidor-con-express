import express from "express"
import { ProductManager } from "./ProductsManager.js"

const app = express();
app.use(express.urlencoded({ extended: true}));

const productos = new ProductManager();
const readProducts = productos.readProducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts);
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById);
});

app.listen(8080, () => {
console.log("aplicacion en el puerto 8080")
});