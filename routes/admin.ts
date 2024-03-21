import express,{Response , Request} from "express";
import { JobDescription } from "../interfaces/interface";
import jobModel from "../models/jobDescription";
const router = express.Router();

// router.get("/jobs" , async(req:Request , res:Response)=>{
//     try {
//         const allJobs = await jobModel.find();
//         res.status(200).json({data : allJobs});
//     } catch (error) {
//         console.log(error);
//         res.json({msg : "Something Wrong!"})
//     }
// })

router.post("/add" , async(req:Request,res : Response)=>{
    
    try {
        
        const data : JobDescription = {
            title : req.body.title,
            description : req.body.description,
            stipend : parseInt(req.body.stipend),
            company : req.body.company,
            location : req.body.location,
            jobIcon : req.body.jobIcon
        };
        const response = new jobModel(data);
        await response.save();
        if(response){
            return res.status(200).json({msg : "Added Succesfully"});
        }
        res.json({msg : "Something Wrong!"});

    } catch (error) {
        console.log(error);
        res.json({msg : "Something Wrong! Not added!"})
    }

})

router.post("/update" , async(req : Request,res : Response)=>{

    try {
        const _id:string = req.body._id ? (req.body._id as string) :"";
        if(_id === ""){
            return res.json({msg : "Something wrong!"})
        }
        const data : JobDescription = {
            title : req.body.title,
            description : req.body.description,
            stipend : req.body.stipend,
            company : req.body.company,
            location : req.body.location,
            jobIcon : req.body.jobIcon
        };
        await jobModel.findOneAndUpdate({_id} , {$set : {
            title:data.title,
            description:data.description,
            stipend:data.stipend,
            location:data.location,
            iobIcon:data.jobIcon,
            company:data.company
        }})
        res.status(200).json({msg : "Updated Succesfully " })
        
    } catch (error) {
        console.log(error);
        res.json({msg : "Something Wrong! Not Update"})
    }

})

router.post("/delete" , async(req:Request , res:Response)=>{

    try {
        const _id:string = req.body._id ? (req.body._id as string) :"";
        await jobModel.findOneAndDelete({_id});
        res.status(200).json({msg : "Deleted Successfully"});

    } catch (error) {
        console.log(error);
        res.json({msg : "Something Wrong! Not Deleted"})
    }
})

export default router;