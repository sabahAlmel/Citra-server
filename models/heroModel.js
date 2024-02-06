import mongoose from "mongoose";

const heroModelSchema = new mongoose.Schema({
    picture:{
        type:String,
        required:true
    },
    ref:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})



const HeroSchema = mongoose.model("HeroSchema", heroModelSchema);

export default HeroSchema;