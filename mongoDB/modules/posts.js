// 2- Posts Collection contains fields:
// - content
// - images "optional"
// - video "optional"
// - likes ( array of objectId ref to user model )
// - createdBy ( objectId ref to user model )
// - comments ( array of objectIds ref to comment model )
// - privacy (only me or public) default public 

import { Schema, Types, model } from "mongoose";


const postschema = new Schema({
    content:{type:String},
    images:[{
        id:{require:true ,  type:String},
        url:{require:true ,  type:String},
    
    }],
    video:[{
        id:{require:true ,  type:String},
        url:{require:true ,  type:String},
    
    }],
    likes:[{
        type:Types.ObjectId,
        ref:'user',
        enum:['love,like' ,'wow' , "angry"]        
    }],
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
    },
    comments:[{
        type:Types.ObjectId,
        ref:'comment',
        
    }],
    privacy:{
        type:String,
        enum:["only" , "public"],
        default:"public"
    },
    postIdOncloudinary:{
       type:String
    }


},{timestamps:true})


export const postModel = model('post' , postschema)