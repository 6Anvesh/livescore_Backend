const mongoose = require('mongoose')
let Schema = mongoose.Schema;
var userSchema = new Schema({
    username:{
        type:String,
        trim:true,
        default:''
    },
    email:{
        type:String,
        trim:true,
        default:''
    },
    phonenumber:{
        type:String,
        trim:true,
        default:''
    },
    password:{
        type:String,
        trim:true,
        default:''
    }
})

module.exports = mongoose.model('Usermodel',userSchema)