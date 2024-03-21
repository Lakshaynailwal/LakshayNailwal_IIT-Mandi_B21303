import { Request , Response , NextFunction } from "express"
import jwt from "jsonwebtoken";

const secretKey = "Lakshay";

export const userMiddleware = async (req : Request,res : Response,next : NextFunction)=>{
    
    const token : string | any= req.headers["authorization"];

    if(token === ""){
        return res.json({msg : "Not a valid user"});
    }

    jwt.verify(token , secretKey , (err:any,decoded:any)=>{
        if(err){
            return res.json({msg : "Not a valid user"})
        }
        else {
            req.query._id = JSON.stringify({_id : decoded._id});
            next();
        }
    })
    

}