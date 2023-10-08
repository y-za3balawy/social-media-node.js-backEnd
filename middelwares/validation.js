
import { Types } from 'mongoose'


export const isvalidObject =  (value,helper)=>{

    if(Types.ObjectId.isValid(value)){
        return true
    }else{
        return helper.message('invalid object')
    
    }
    }

export const validate = (schema)=>{
         return (req,res,next)=>{
            const all ={...req.body,...req.params,...req.query  }
            
            const validateResult = schema.validate(all, {abortEarly:false})

            if(validateResult.error){
              return   next(new Error( validateResult.error))

            }else{
                return next()
            }


        }
}

