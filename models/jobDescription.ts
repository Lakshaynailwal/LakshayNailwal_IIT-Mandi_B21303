import mongoose from "mongoose";
import { JobDescription } from "../interfaces/interface";

const jobSchema = new mongoose.Schema<JobDescription>({
    title:{
        type : String,
        required : true
    },
    location:{
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    stipend :{
        type : Number,
        required : true
    },
    jobIcon : {
        type : String
    }
})

const jobModel = mongoose.model<JobDescription>("jobDescription" , jobSchema);

export default jobModel;