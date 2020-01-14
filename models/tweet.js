const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        default:''
    },
    tweet:{
        type:String,
        trim:true,
        default:''
    },
    hashTags:[{
        type:String,
        trim:true,
        default:[]
    }]
},{timestamps:true,autoIndex:true})

module.exports = mongoose.model('tweetModel',tweetSchema);