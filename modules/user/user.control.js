import { userModel } from "../../mongoDB/modules/user.js";
import { Errorhandling } from "../../utilites/globalErrorHandling.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { htmlcode } from "../../utilites/email.later.js";
import { sendemail } from "../../utilites/send.email.js";
import  Jwt  from "jsonwebtoken";
import { tokenModel } from "../../mongoDB/modules/token.js";
import cloudinary from './../../utilites/cloud.js';
import Randomstring from "randomstring";


const registration = Errorhandling(async (req,res, next)=>{

    const {firstName ,lastName ,email , password, phone, age}   = req.body

    const user = await userModel.findOne({email})
    if(user){
       return next(new Error('your email already exist'))
    }
    const activationCode = crypto.randomBytes(64).toString('hex')

    const hashPassword = bcrypt.hashSync(password ,Number(process.env.salt_round) ) 

    const link = `http://localhost:2000/confirmEmail/${activationCode}`;


    const  isSend =await  sendemail({to:email  , subject:'confirmEmail' , html:htmlcode(link)})

    if(!isSend){
       return next(new Error('cant send email'))

    }
    
    const data = await  userModel.create( {firstName ,lastName ,email , password:hashPassword, phone, age ,activationCode})

    if(!data){
     return   next(new Error('wrong'))

    }
    return res.json({message:'check  your email  ' , data})




})


const confirmEmail = Errorhandling(async (req,res,next)=>{
const {activationCode}=  req.params  
console.log(activationCode)
    const user = await userModel.findOneAndUpdate({activationCode},{confirmEmail:true , $unset:{activationCode:1}} ,{new:true})

    if(!user){
        return next(new Error('confirm your email '))
    }

    return res.json({message:'done' , user})




})


const logIn = Errorhandling(async(req,res,next)=>{
    const {email , password} =  req.body

    const user = await userModel.findOne({email})

    if(!user){
      return  next(new Error('email not exist'))
    }
    if(!user.confirmEmail){
        return  next(new Error('please confirm your email'))
      }

    const pass =  bcrypt.compareSync(password , user.password)

    if(!pass){
        return  next(new Error('wrong password'))

    }

    const token = Jwt.sign({name:user.firstName , id:user.id} , process.env.key)

    if(!token){
        return  next(new Error('cant  generate token'))

    }

    await userModel.findOneAndUpdate({email} , {isonline:true},{new:true})

    const create_token =await tokenModel.create({token,user:user.id ,agent:req.headers['user-agent'] ,isvalid:true })
    if(!create_token){
        return  next(new Error('cant  create  token  in database' ))

    }

    res.json({message:'done' , "token":token })






})


const userProfile = Errorhandling( async (req,res,next)=>{
const {email} =  req.body
const user = await userModel.findOne({email})

if(!user){
    return next(new Error('profile not found '))
}

return res.json({message:'done' , user})



})

// update password also
const updateProfile = Errorhandling(async(req,res,next)=>{
    const {firstName ,lastName ,newemail , newpassword, phone, age}   = req.body

    const hashPassword = bcrypt.hashSync(newpassword ,Number(process.env.salt_round) ) 
    const activationCode = crypto.randomBytes(64).toString('hex')

    const data=  await userModel.findOneAndUpdate(req.user._id,{age,activationCode,phone,firstName , lastName ,password:hashPassword ,email:newemail,confirmEmail:false},{new :true})
    if(!data){

        return next(new Error('cant update profile'))
    }


    const link = `http://localhost:2000/confirmEmail/${activationCode}`;


    const  isSend =await  sendemail({to:data.email  , subject:'confirmEmail' , html:htmlcode(link)})

    if(!isSend){
        return next(new Error('cant send email'))
 
     }


    return res.json({message:'done' , data})
})

//----
const addpicture = Errorhandling(async(req,res,next)=>{


if(!req.file){
    return next(new Error('need image'))
}



const {secure_url , public_id} =  await cloudinary.uploader.upload(req.file.path ,{folder:`${process.env.folder_cloude}/profile image`} )


const data = await userModel.findByIdAndUpdate(req.user._id,{imageProfile:{url:secure_url ,id:public_id}}  ,{new :true} )

if(!data){
    return next(new Error('faild to add image'))

}

 return  res.json({message:'done',data })

})
 

const addCoverPictures= Errorhandling(async(req,res,next)=>{


    if(!req.file){
        return next(new Error('need image'))
    }
    
    
    
    const {secure_url , public_id} =  await cloudinary.uploader.upload(req.file.path ,{folder:`${process.env.folder_cloude}/Cover image`} )
    
    
    const data = await userModel.findByIdAndUpdate(req.user._id,{$push:{coverpictures:{url:secure_url ,id:public_id}}}  ,{new :true} )
    
    if(!data){
        return next(new Error('faild to add image'))
    
    }
    
     return  res.json({message:'done',data })
    
    })
   
const AddVedio = Errorhandling(async (req,res, next)=>{


    if(!req.file){
        return next(new Error('need video'))
    }
    
  console.log(req.file)
    
    const {secure_url , public_id} =  await cloudinary.uploader.upload(req.file.path,{ resource_type:"video",folder:`${process.env.folder_cloude}/vedio`} )
    
    
    const data = await userModel.findByIdAndUpdate(req.user._id,{$push:{vedio:{url:secure_url ,id:public_id}}}  ,{new :true} )
    
    if(!data){
        return next(new Error('faild to add image'))
    
    }
    
     return  res.json({message:'done',data })


})


const softDelete = Errorhandling(async (req,res,next)=>{



    const  data = await userModel.findByIdAndUpdate(req.user._id , {isDeleted:true} ,{new:true})

    if(!data){
      return next(new Error('cant update email'))
    }


    return res.json({message:'done', data})


})

const forgetPassword= Errorhandling(async(req,res,next)=>{

const {email}= req.body

const user = await userModel.findOne({email})

if(!user){
    return next(new Error('user not found'))

}

const forgetcode =  Randomstring.generate({length:5 , charset:'numiric' })

user.forgetcode =forgetcode
await user.save()

const isSend = await sendemail({to:email , subject:'confirm email' , html:htmlcode('',forgetcode)})


if(!isSend){
    return next(new Error('cant send email '))
}

return res.json({message:'doen reviwe your email' })


})

const resetPassword = Errorhandling(async(req,res,next)=>{

const {forgetcode}= req.body

const user = await userModel.findOne({forgetcode})

if(!user){
    next(new Error('wrong code '))
}

const  hashPassword= bcrypt.hashSync(req.body.password ,Number(process.env.salt_round))


const data = await userModel.findOneAndUpdate( {email: user.email}, {email:user.email ,password:hashPassword} ,{$unset:{forgetcode:1}} )

if(!data){

    next(new Error('cant update your info '))
}


const tokens = await tokenModel.find({user:user._id})

tokens.forEach(async (id)=>{
    console.log(id)
    await tokenModel.findByIdAndUpdate(id._id ,{isvalid:false})
 
})
return res.json({message:'done try login'})


})

export{
    registration,
    confirmEmail,
    logIn,
    userProfile,
    updateProfile,
    addpicture,
    addCoverPictures,
    AddVedio,
    softDelete,
    forgetPassword,
    resetPassword
}