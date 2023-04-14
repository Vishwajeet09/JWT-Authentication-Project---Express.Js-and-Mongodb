import mongoose from "mongoose";

// Defining Schema:

const CandidateSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type: String, require: true, unique: true},
    phoneNumber: {type: Number, require: true},
    age:{type:Number, required:true},
    join:{type:Date, default:Date.now}
})

//Compiling Schema:

const CandidateModel = mongoose.model("Candidate", CandidateSchema)

export default CandidateModel