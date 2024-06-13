const express=require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs=require("bcryptjs")
const {signupmodel}=require("./models/Signup")

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb+srv://akhitha:akhi2603@cluster0.gikzvie.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")
const generatehashedpassword= async (password)=>{
    const salt=await bcryptjs.genSalt(10)
    return bcryptjs.hash(password,salt)
    
}




app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedpassword =await generatehashedpassword(input.password)
    console.log(hashedpassword)
    input.password=hashedpassword
    let blog=new signupmodel(input)
    blog.save()
       
    res.send("success")
})
app.listen(8083, () => {
    console.log("server started")
})