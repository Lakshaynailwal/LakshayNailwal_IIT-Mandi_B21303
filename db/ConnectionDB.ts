import mongoose from "mongoose";

const URL : string = "mongodb+srv://nailwal001:Cz1i2Gwc6oIDgd3H@forsthack.eqmilza.mongodb.net/";

export const connection = ():void=>{
    mongoose.connect(URL).then(():void=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        console.log(err);
    })
}