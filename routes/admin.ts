import express,{Response , Request} from "express";
import { JobDescription } from "../interfaces/interface";
import jobModel from "../models/jobDescription";

// handling diffrent routes for admin
const router = express.Router(); 

router.post("/add" , async(req:Request,res : Response) =>{
    // job adding route
    try {

        //getting the data from frontend
        const data : JobDescription = {
            title : req.body.title as string,
            description : req.body.description as string,
            stipend : req.body.stipend as number,
            company : req.body.company as string,
            location : req.body.location as string,
            jobIcon : req.body.jobIcon as string
        };
        // creating a new job
        const response = new jobModel(data);
        //saving in DB
        await response.save();

        res.status(200).json({msg : "Added Succesfully"});

    } catch (error) {
        console.log(error);
        res.json({msg : "Something Wrong! Not added!"})
    }

})

router.post("/update" , async(req : Request,res : Response)=>{
    // handling the update request based on id filter
    try {
        //extracting the id from body as string
        const _id:string = req.body._id ? (req.body._id as string) :"";

        if(_id === ""){
            return res.json({msg : "Something wrong!"})
        }

        //extrating the data and update it for the given id
        await jobModel.findOneAndUpdate({_id} , {$set : {
            title:req.body.title as string,
            description:req.body.description as string,
            stipend:req.body.stipend as number,
            location:req.body.location as string,
            iobIcon:req.body.jobIcon as string,
            company:req.body.company as string
        }})
        res.status(200).json({msg : "Updated Succesfully " })
        
    } catch (error) {
        console.log(error);
        res.json({msg : "Something Wrong! Not Update"})
    }

})

router.post("/delete" , async(req:Request , res:Response)=>{

    //handling the delete route based on id
    try {
        //extracting the id
        const _id:string = req.body._id ? (req.body._id as string) :"";
        if(_id === ""){
            return res.status(200).json({msg : "does not exist"})
        }
        
        //deleting based on id
        await jobModel.findOneAndDelete({_id});
        res.status(200).json({msg : "Deleted Successfully"});

    } catch (error) {
        console.log(error);
        res.json({msg : "Something Wrong! Not Deleted"})
    }
})

export default router;