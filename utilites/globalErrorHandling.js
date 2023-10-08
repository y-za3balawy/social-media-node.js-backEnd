


export function Errorhandling(x){

    return (req, res, next)=>{
        x(req,res,next).catch(error =>{

               return next(new Error(error))
            })
    
    }

}



export const global_error_handlingh =  ( error,req,res,next)=>{
 
    //  const statusecode = error.cause
    return res.json({message: " global error", err: error.message  , stack: error.stack})
}