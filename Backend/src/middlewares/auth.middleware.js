import jwt from 'jsonwebtoken';
import blackListTokenModel from '../models/blacklist.model.js';

export async function authenticateUser(req,res,next){
    console.log("Authenticating user...");
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }

    const isTokenBlacklisted = await blackListTokenModel.findOne({token});
    if(isTokenBlacklisted){
        return res.status(401).json({message:"Unauthorized: Token is invalid. Please login again."});
    }
    try{
        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }
}