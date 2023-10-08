
import { Schema, Types, model } from 'mongoose';



const tokenSchema = new Schema({
    token:{
        type:String,
        require:true
    },
    user:{
        type:Types.ObjectId,
        ref:'user'
    },
    isvalid:{
        type:Boolean,
        default:false
    },
    agent:{
        type:String
    },
    expiredat:{
type:String
    }
},{timestamps:true})

export const tokenModel =  model('token' , tokenSchema)