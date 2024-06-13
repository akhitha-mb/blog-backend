const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type:String,require:true},
        "email":{type:String,requiresignupmodel:true},
        "password":{type:String,require:true}
    }
)
let signupmodel=mongoose.model("Signup",schema)
module.exports={signupmodel}