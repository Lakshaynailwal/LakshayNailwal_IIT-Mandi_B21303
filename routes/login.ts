// import express,{Request , Response} from "express";
// import userModel from "../models/user";
// const authRouter = express.Router();

// authRouter.post("/login", async (req:Request,res:Response)=>{
//     const name= req.body.name;
//     try {
//         const user = await userModel.findOne({name});
//         if(user && (user.password === req.body.password)){
//             const token = tokenCreation(user._id.toString() , secret);
//             res.status(200).json({msg:"true" , data : token});
//         }
//         else res.json({msg : "Invalid Inputs!"});
//     } catch (error) {
//         console.log(error);
//     }
// })
// authRouter.post("/sign", async (req:Request,res:Response)=>{
//     const name = req.body.name;
//     const password = req.body.password;
//     try {
//         const user = new userModel({name , password});
//         await user.save();
//         if(user){
//             const token = tokenCreation(user._id.toString() , secret);
//             res.status(200).json({msg:"true" , data : token});
//         }
//         else res.json({msg : "Something Wrong!"});
//     } catch (error) {
//         console.log(error);
//     }
// })

// export default authRouter;