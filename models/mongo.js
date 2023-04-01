const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    "login":{
        type:String,
        required:true
    },
    "password":{
        type:Number,
        required:true
    }
})
let User= mongoose.model("NewUser",UserSchema)

module.exports=User