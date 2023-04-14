import jwt from 'jsonwebtoken';
import UserModel from "../models/userModal.js" 


const verifyToken = async(req, res, next) => {
        const {token} = req.cookies;
        if (token){

            const decoded = jwt.verify(token, "mynameisvishwajeetkumarsingh0909");
            req.user = await UserModel.findById(decoded._id);
            next();
            
        }else{
            res.send("Please Login")
        }
        };
        
export default verifyToken;