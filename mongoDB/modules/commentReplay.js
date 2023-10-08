// <!-- 4- commentReplay
// - replyBody 
// - createdBy ( objectId ref to user model )
// - commentId ( objectId ref to comment model )
// - likes ( array of objectId ref to user model ) -->

import { Schema, Types, model } from "mongoose";


const commentReplaySchema  = new Schema({

    replyBody:{
        type:String,
        require:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'user',
        require:true,

    },
    commentId:{
        type:Types.ObjectId,
        ref:'comment',
        require:true,
    },
    likes:[
        {
            type:Types.ObjectId,
            ref:'user',
         
        }
    ]


})


export const  commentReplayModel = model('commentReplay'  ,commentReplaySchema)
