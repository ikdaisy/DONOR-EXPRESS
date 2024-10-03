import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    dob:{type:String},
    phone:{type:Number},
    place:{type:String},
    bloodgroup:{type:String}
})

export default mongoose.model.donors||mongoose.model("donor",donorSchema)

