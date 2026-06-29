import mongoose from "mongoose"

export const connectDb = async() => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI!)
        console.log(`MongoDb Connected : ${db.connection.host}`)
    } catch (err) {
        console.log("Error connecting to MongoDb", err)
        process.exit(1)

    }
}