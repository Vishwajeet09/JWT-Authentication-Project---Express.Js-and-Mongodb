import mongoose from "mongoose";


// Defining Schema:

const userSchema = new mongoose.Schema({
    email:{type: String, require: true},
    phoneNumber: {type: Number, require: true},
    password: {type: String, require: true}
    })

// Compiling Schema:

const UserModel = mongoose.model("UserModel", userSchema)

export default UserModel