const mongoose =require("mongoose")

const schema= new mongoose.Schema({
    _id:String,
    count:Number
});
module.exports=mongoose.model("Counters",schema);