import { tokenModel } from "../mongoDB/modules/token.js";
import { Errorhandling } from "../utilites/globalErrorHandling.js";
import  Jwt  from "jsonwebtoken";
import { userModel } from './../mongoDB/modules/user.js';




  export const authentication =  Errorhandling(async (req,res,next)=>{


    const {token}  =  req.headers 

    if(!token){
      return  next(new Error('token required'))
    }

    const check_token = await tokenModel.findOne({token})

    if(!check_token){
        next(new Error('invalid Token'))
    }


    const  decoded = Jwt.verify(token ,  process.env.key)

    if(!decoded){
        return (new Error('invalid token '))
    }


    const  user = await userModel.findById({_id:decoded.id})
    if(!user){
        return (new Error('user not found'))
    }


    req.user = user

    return next()



})