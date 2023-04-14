import CandidateModel from "../models/candidateModal.js"
import UserModel from "../models/userModal.js"
import jwt from "jsonwebtoken"

class candidateController{
//<--------------------- Landing Page ------------------------------------> 

    static landingPage = async(req,res) =>{
        res.render("landingPage")
    }

//<---------------- UserLogIn Page ---------------------------------------> 

    static userLogIn = (req,res) => {
        res.render("login")
    }

//<------------------ UserSignIn Page -------------------------------------> 

    static userSignUp = (req,res) => {
        res.render("signup.ejs")
    }

// <---------------- UserDetails, Saved In Database ------------------------>

    static createUserDoc = async(req,res) => {
        try {
            const {email, phoneNumber, password} = req.body
            const doc = new UserModel({
                email,
                phoneNumber,
                password
            })
            // Saving userDoc in db
            await doc.save()

            res.redirect("/login");
        } 
        catch (error) {
            res.render('error.ejs', {info:error.message})
        }}

// <---------------- Candidate Detail Page, Shown After User LogIn -------------->

    static getAllDoc = async(req,res) =>{
        try {
            const result = await CandidateModel.find()
            res.render("index", {data: result})
        } catch (error) {
            console.log(error);
        }
        
    }

//<--------------- User LogIn Verfication -------------------------->

    static verifyUser = async(req,res) => {
        try {
            // destructure
            const {email, password} = req.body

            //  findingOut email from db:
            const user = await UserModel.findOne({email:email})

            //  Handling null value in result (it come when new user direct try to login without signup):
            if (user != null){
                if (user.email == email && user.password == password){
                    
                     // Generate JWT Token
                    const token = jwt.sign({ userID: user._id }, "mynameisvishwajeetkumarsingh0909", { expiresIn: '5d' })

                    res.cookie("token",token,{httpOnly: true})
                
                    res.redirect("/candidatepage")

                    
                }
                else{
                    res.send("Email or Password is Wrong")
                }
            }
            else{
                res.send("You are not a register User")
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

// <----------- User Creating Candidate's Doc & Saving it to Database ----------------->

    static createCandidateDoc = async(req,res) =>{
        try {
            // destructure
            const {name, email, phoneNumber, age} = req.body
            //  Saving Candidate Details in Database:
            const emp = new CandidateModel({
                name,
                email,
                phoneNumber,
                age,
            })
            await emp.save()
            res.redirect("/candidatePage")
        } catch (error) {
            console.log(error);
        }
    }

//<--------------------------- User LogOut Page -------------------------------------> 

    static logOut = (req,res) => {
        res.cookie("token", " ", {httpOnly: true, expires: new Date(Date.now())})
        res.redirect("/")
    }

//<-------------------- Candidate's Edit Page --------------------------------->  

    static editDoc = async(req,res) =>{
        try {
            const result = await CandidateModel.findById(req.params.id)
            res.render("edit", {data:result})
        } catch (error) {
            console.log(error);
        }
    }

//<------------------------- Candidate's Update Page ----------------------------------->

    static updateDocById = async(req,res) =>{
        try {
            const result = await CandidateModel.findByIdAndUpdate(req.params.id, req.body)
            res.redirect("/candidatePage")
        } catch (error) {
            console.log(error);
        }
    }

//<-------------------- Candidate's Delete Code -----------------------------------> 

    static deleteDocById = async(req,res) =>{
        try {
            const result = await CandidateModel.findByIdAndDelete(req.params.id)
            res.redirect("/candidatePage")
        } catch (error) {
            
        }
    }

//<----------------------- Add New Candidate --------------------------------------> 

    static addInfo = async(req,res) =>{
        res.render("addInfo")
    }

}

export default candidateController