const mongoose =require("mongoose")

const schema= new mongoose.Schema({
    _id:String,
    product_name:String
});
module.exports=mongoose.model("Products",schema);