import HeroSchema from "../models/heroModel.js";
import fs from "fs";

function removeImage(image) {
  fs.unlinkSync("images/" + image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

export const uploadPic =  async(req,res, next)=>{
    try{
        const picture = req.file.filename;
        const {ref} = req.body;
            const hero =  new HeroSchema({picture:picture, ref:ref});
           await hero.save();
            res.status(200).json({message:"picture uploaded successfully !", picture:hero})
        }catch(err){
        res.status(500);
        next(err)
    }
}

export const display = async(req,res,next) => {
    try{
        const hero = await HeroSchema.findOne({ref:1});
        res.status(200).send(hero)
    }catch(err){
        res.status(500);
        next(err);
    }
}

export const updatePic = async(req,res,next)=>{
  try{
    const picture = req.file.filename;
    const picToDelete = await HeroSchema.findOne({ref:1});
    removeImage(picToDelete.picture);
    const hero =await HeroSchema.findOneAndUpdate({ref:1},{$set:{picture:picture}})
    res.status(200).send(hero)
  }catch(err){
    next(err)
  }
}

export const deletePic = async(req,res,next)=>{
  try{
    await HeroSchema.deleteMany({});
    res.status(200).send("deleted successfully !")
  }catch(err){
    next(err)
  }
}