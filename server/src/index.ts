import { AppDataSource } from "./data-source.js"
import { Product } from "./entity/Product.js"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new product into the database...")
    const product = new Product()
    product.firstName = "Timber"
    product.lastName = "Saw"
    product.age = 25
    await AppDataSource.manager.save(product)
    console.log("Saved a new product with id: " + product.id)

    console.log("Loading products from the database...")
    const products = await AppDataSource.manager.find(Product)
    console.log("Loaded products: ", products)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
