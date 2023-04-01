const express=require("express")
const app=express()
const port=4000
const mongoose=require("mongoose")
const NewUser=require("./models/mongo")
app.use(express.json())
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

 
mongoose.connect("mongodb://localhost:27017",{useNewUrlParser:true})
app.post("/auth/signup",async(req,res)=>{
    const {login,password}=req.body;
        const user=await NewUser.create({
            login,
            password
        }).then((user)=>{
            res.status(201).json({message:"new user created",user})
        }
)

bcrypt.hash(password,10,(error,hash)=>{
    if(error){
        return res.status(400).json({mesage:"error in creating user"})
    }
})

user.save((err)=>{
    if(err){
        return res.status(400).json({mesage:"error in creating user"})
    }

})
});

app.get("/auth/login",(req,res)=>{
    const {login,password}=req.body;
    if(!login|| !password){
        return res.status(400).json({message:"fill all fields"})
    }
    NewUser.findOne({login},(err,user)=>{
        if(!err || ! user){
            return res.status(400).json({mesage:"athentication failed"})
        }
       
    }),
   
bcrypt.compare(password,NewUser.password,function(err,valid){
    if(!err || !valid){
        return res.status(400).json({mesage:"athentication failed"})
    }
    
    const acctoken=jwt.sign({userid:NewUser._id,login:NewUser.login} ,"Secret",{expiresin:"10 m"});
    
    const reftoken=jwt.sign({userid:NewUser._id,login:NewUser.login} ,"refreshSecret",{expiresin:"10d"});
 
    res.status(200).json({acctoken,reftoken})
})

});

function  verify(req,res,next){
    const header=reqheaders["authorization"];
    const token=header&& header.split("")[1];

    if(!token){
        return res.status(401).json({message:"unauthorizes"})
    }

    jwt.verify(token,"secret",function(err,payload){

        if(err){
            return res.status(401).json({message:"unauthorizes"})
        }
        req.payload=payload;
        next();
    

    })
}

app.get("/protected",verify,function(req,res){
    res.json({message:"protected endpoint",payload:req.payload})
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})

  