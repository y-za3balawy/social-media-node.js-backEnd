import { Schema, model } from "mongoose";

// - firstName
// - lastName
// - email
// - password
// - phone(encrypt phone number) SEE NOTES
// - age
// - confirmEmail
// - isDeleted


const userSchema = new Schema({

    firstName:{
        type:String,
        require:true,
        maxLength:[10]
    
    },
    lastName:{
        type:String,
        require:true,
        maxLength:[10]
    
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    phone:{
        type:Number,
        require:true

    },
    password:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        min:[8],
        max:[90],
        require:true
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    imageProfile:{
        id:{require:true ,  type:String},
        url:{require:true ,  type:String},
    
    },
    coverpictures:[{
        id:{require:true ,  type:String},
        url:{require:true ,  type:String},
    
    }],
    vedio:[{
        id:{require:true ,  type:String},
        url:{require:true ,  type:String},
    
    }],
    isDeleted:{
        type:Boolean,
        default:false
    },
    isonline:{
        type:Boolean,
        default:false,
        
    },
    role:{
type:String,
default:'user'
    },
    forgetcode:String, 
    activationCode:String,

},{timestamps:true})



export  const userModel = model('user' , userSchema)