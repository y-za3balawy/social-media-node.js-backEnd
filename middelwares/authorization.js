import { Errorhandling } from "../utilites/globalErrorHandling.js"



export const  authorization =  (role)=>{

return Errorhandling(async(req,res,next)=>{
    if(role !==  req.user.role){
      return  next(new Error('authentcation first'))
    }else{
        return next()
    }
})

}