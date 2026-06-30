import mongoose from "mongoose"
import config from "../config/config"

export const connectDb = async() => {
    try{
        // console.log("MONGO_URI:", process.env.MONGO_URI);
        const db = await mongoose.connect(config.mongoUri as string)
        console.log(`MongoDb Connected : ${db.connection.host}`)
    } catch (err) {
        console.log("Error connecting to MongoDb", err)
        process.exit(1)

    }
}