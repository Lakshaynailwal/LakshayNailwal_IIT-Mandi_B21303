import express , {Request , Response} from "express";
import { connection } from "./db/ConnectionDB";
import jobModel from "./models/jobDescription";
import router  from "./routes/admin";
import cors from "cors"

const app = express();
const Port = 4000;
connection();

app.use(cors())
app.use(express.json())


app.get("/jobs" , async(req : Request,res: Response)=>{
    try {
        const filterString :string = req.query.filter ? (req.query.filter as string) : "";
        const page:number = req.query.page ? parseInt(req.query.page as string) : 1;
        const stIndex : number = (page-1)*6;
        const edIndex : number = page*6;
        const allJobs = await jobModel.find({
            $or: [
                {title : {$regex : filterString , $options:'i'}},
                {location : {$regex : filterString , $options:'i'}},
                {company : {$regex : filterString , $options:'i'}}
            ]
        }).limit(6).skip(stIndex);
        const totalCount : number = await jobModel.countDocuments({});
        const isNext: boolean = edIndex < totalCount ? true : false;
        const isPrev: boolean = stIndex > 0 ? true : false;


        res.status(200).json({data:allJobs , isNext , isPrev , total:totalCount})
    } catch (error) {
        res.status(401).send("Error Occured");
        console.log(error)
    }
})


app.use("/admin" , router);

app.listen(Port , ():void=>{
    console.log("Running...");
});