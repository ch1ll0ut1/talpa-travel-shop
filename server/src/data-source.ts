import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "talpa",
    password: "password",
    database: "talpa",
    synchronize: true,
    logging: false,
    entities: [Product],
    migrations: [],
    subscribers: [],
})
