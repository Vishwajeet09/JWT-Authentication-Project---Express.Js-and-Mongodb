import mongoose from "mongoose";

const connectDB = async(DATABASE_URL) =>{
    try{
        // const DB_OPTIONS = {
        //     dbName: "Employee",
        // };
        // console.log(DB_OPTIONS);
        // await mongoose.connect(DATABASE_URL);
        mongoose.set('strictQuery', false);
        await mongoose.connect(DATABASE_URL);
        console.log("Database Connected Successfully..");
    }
    catch(err){
        console.log(err);
    }
};

export default connectDB;
