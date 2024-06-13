const express=require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs=require("bcryptjs")
const jsonwebtoken=require("jsonwebtoken")
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
       
    res.json({"status":"success"})
})
app.post("/signin",(req,res)=>{
    let input=req.body
    signupmodel.find({"email":req.body.email}).then(
        (response)=>{
           if (response.length>0) {
           

            let dbPassword=response[0].password
            console.log(dbPassword)
            bcryptjs.compare(input.password,dbPassword,(error,ismatch)=>{
                if (ismatch) {
                    jsonwebtoken.sign({email:input.emailid},"signupmodel",{expiresIn:"1d"},(error,token)=>{
                        if (error) {
                            res.json({status:"anable to create token"})
                            
                        } else {

                            res.json({status:"success","userId":response[0]._id,"token":token})
                        }
                    })
                   
                } else {
                    res.json({status:"incorrect password"})
                    
                }
            })

           } else {
            res.json({status:"user not found"})
            
           }
        }
    ).catch()





})




app.listen(8083, () => {
    console.log("server started")
})