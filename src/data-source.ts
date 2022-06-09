import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

// console.log(process.env.DB_HOST)
// console.log(process.env.DB_PORT)
// console.log(process.env.DB_USERNAME)
// console.log(process.env.DB_PASSWORD)
// console.log(process.env.DB_DATABASE)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})