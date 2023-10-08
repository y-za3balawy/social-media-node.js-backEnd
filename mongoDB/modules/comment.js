// - commentBody
// - createdBy ( objectId ref to user model )
// - PostId( objectId ref to post model )
// - replies ( array of objectId ref to reply model )
// - likes ( array of objectId ref to user model )

import { Schema, Types, model } from "mongoose";



const commentSchema =  new Schema({
    commentBody:{
        type:String,
        require:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        require:true
    },
    postId:{
        type:Types.ObjectId,
        ref:'post',
        require:true
    },
    replies:[
        {
            type:Types.ObjectId,
            ref:'reply',
           
        }
    ],
    likes:[
        {
            type:Types.ObjectId,
            ref:'user',
         
        }
    ]



})


export const commentModel = model('comment' , commentSchema)