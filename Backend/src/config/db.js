import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to the database.`)
    }
    catch(err){
        console.log(`Couldn't connect to Database. Error: ${err.message}`);
        throw err;
    }
}

export default connectDB;