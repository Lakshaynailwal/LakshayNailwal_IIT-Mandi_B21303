import express , {Request , Response} from "express";
import { connection } from "./db/ConnectionDB";
import jobModel from "./models/jobDescription";
import router  from "./routes/admin";
import cors from "cors"

const app = express();
const Port = 4000;

//Connection to DB
connection();

//middlewares
app.use(cors())
app.use(express.json()) // to get json data from body

app.get("/" , (req:Request,res:Response) :void=>{
    res.json({msg : "Hi from API" ,
    
    Routes : {
        "/jobs" : "to get all the jobs",
        "/admin/add" : "add a job",
        "/admin/update" : "update existing one",
        "/admin/delete" : "delete an entry"
    }
});
})

app.get("/jobs" , async(req : Request,res: Response)=>{
    try {

        //pagination
        const page:number = req.query.page ? parseInt(req.query.page as string) : 1;
        //setting indexes for limiting
        const stIndex : number = (page-1)*6;
        const edIndex : number = page*6;
        //Total no of jobs
        const totalCount : number = await jobModel.countDocuments({});
        // Forward and Previous controls
        const isNext: boolean = edIndex < totalCount ? true : false;
        const isPrev: boolean = stIndex > 0 ? true : false;
        
        //searching
        const filterString :string = req.query.filter ? (req.query.filter as string) : "";
        // searching via filter string 
        // checking case insensitive checking in title location and company
        const allJobs = await jobModel.find({
        $or: [
                {title : {$regex : filterString , $options:'i'}},
                {location : {$regex : filterString , $options:'i'}},
                {company : {$regex : filterString , $options:'i'}}
            ]
        }).limit(6).skip(stIndex);
        const length:number = allJobs.length;
        res.status(200).json({data:allJobs , isNext , isPrev, length , total:totalCount})

    } catch (error) {
        res.status(401).send("Error Occured");
        console.log(error)
    }
})

//defining the admin routes
app.use("/admin" , router);

//Listing the app at 4000 port
app.listen(Port , ():void=>{
    console.log("Running...");
});
