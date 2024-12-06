const userModel=require('../models/user.model')

const jwt=require('jsonwebtoken')

const checkUser=async(req,res)=>{
    try{
        const {id,password}=req.body;

        const user = await userModel.findOne({"id" : id})
        
        if(user && user.password === password){
            const userId=user.id
            const role=user.role
            jwt.sign({user},"secret",(err,token)=>{ 
                if(!err)
                    res.status(200).json({status : "success",token,role,userId})
                else
                    res.status(500).json("jwt error")
            })
        }
        else{
            res.status(401).json("invalid credentials")
        }

    }
    catch(error){
        res.status(500).json("Internal Server Error")
    }
}


module.exports={
    checkUser
}
