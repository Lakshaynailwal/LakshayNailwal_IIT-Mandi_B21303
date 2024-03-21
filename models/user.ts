import {Schema , model } from "mongoose";
import { User } from "../interfaces/interface";
const userSchema = new Schema<User>({
    name : {
        type:String,
        unique:true,
        required:true
    },
    password : {
        type:String,
        required:true
    }
})

const userModel = model("user" , userSchema);

export default userModel;