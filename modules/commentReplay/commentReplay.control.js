import { commentModel } from "../../mongoDB/modules/comment.js";
import { commentReplayModel } from "../../mongoDB/modules/commentReplay.js";
import { postModel } from "../../mongoDB/modules/posts.js";
import { Errorhandling } from "../../utilites/globalErrorHandling.js";



const replay  = Errorhandling(async(req,res,next)=>{

    
const {postId,replyBody ,commentId }= req.body

const post =await postModel.findById(postId)
const comment =await commentModel.findById(commentId)
if(!comment){
    return next(new Error('comment deleted'))
}
if(!req.user._id){
    return next(new Error('authenticate first'))
}
if(!post){
    return next(new Error('post is deleted'))
}

if(req.user.isDeleted == true){
    return next(new Error('you cant add comment'))
}

const data = await commentReplayModel.create({replyBody , createdBy:req.user._id ,commentId})
await commentModel.findByIdAndUpdate(commentId,{replies:data._id})
res.json({message:'done' , data})


}) 


const UpdateReplay = Errorhandling(async(req,res,next)=>{

    const {postId,replyBody ,commentId ,replyId}= req.body

    const post =await postModel.findById(postId)
    const replay = await commentReplayModel.findById(replyId)
    const comment = await commentModel.findById(commentId)
    if(!req.user._id){
        return next(new Error('authenticate first'))
    }
    if(!post){
        return next(new Error('post is deleted'))
    }
    if(!comment){
        return next(new Error('post is comment'))
    }
    if(req.user.isDeleted == true){
        return next(new Error('you cant add comment'))
    }

    if(replay.createdBy.toString() !== req.user._id.toString()) {
        return next(new Error('only owner can update comment '))
    }

    const data = await commentReplayModel.findByIdAndUpdate(replyId ,{replyBody} ,{new :true})
    
    return res.json({message:'done' , data})
})  

const  DeleteReplay = Errorhandling(async (req,res,next)=>{
    const {postId ,commentId ,replyId}= req.body
    
    const post =await postModel.findById(postId)
    const replay = await commentReplayModel.findById(replyId)
    const comment = await commentModel.findById(commentId)
    if(!req.user._id){
        return next(new Error('authenticate first'))
    }
    if(!post){
        return next(new Error('post is deleted'))
    }
    if(!comment){
        return next(new Error('post is deleted'))
    }
    if(!replay){
        return next(new Error('replay is deleted'))
    }
    if(req.user.isDeleted == true){
        return next(new Error('you cant add comment'))
    }

    if(replay.createdBy.toString() !== req.user._id.toString()) {
        return next(new Error('only owner can delete replay '))
    }


    const data = await commentReplayModel.findByIdAndDelete(replyId )
await commentModel.findByIdAndUpdate(commentId, {$pull:{ replies :data._id}})

    
    return res.json({message:'done' , data})



})

const likereplay  = Errorhandling(async(req,res,next)=>{
    const {postId ,commentId,replyId}= req.body

    const post =await postModel.findById(postId)
    const comment =await commentModel.findById(commentId)
    const replay = await commentReplayModel.findById(replyId)
    if(!comment){
        return next(new Error('comment not found'))
    }
    if(!req.user._id){
        return next(new Error('authenticate first'))
    }
    if(!post){
        return next(new Error('post is deleted'))
    }
    if(!replay){
        return next(new Error('replay is deleted'))
    }
    
    if(req.user.isDeleted == true){
        return next(new Error('you cant add comment'))
    }

  
    if(replay.likes.includes(req.user._id)){
        return next(new Error('you like this post before '))
    }
    
    
    const data =await commentReplayModel.findByIdAndUpdate(replyId,{ $push:{likes:req.user._id}}, {new:true})
    
    
    return res.json({message:'done' , data})

  })

const Unlikereplay =Errorhandling(async (req,res,next)=>{
    const {postId ,commentId ,replyId}= req.body

    const post =await postModel.findById(postId)
    const comment =await commentModel.findById(commentId)
    const replay = await commentReplayModel.findById(replyId)
      
    if(!comment){
        return next(new Error('comment not found'))
    }
    if(!req.user._id){
        return next(new Error('authenticate first'))
    }
    if(!post){
        return next(new Error('post is deleted'))
    }
    if(!replay){
        return next(new Error('replay is deleted'))
    }
    
    if(req.user.isDeleted == true){
        return next(new Error('you cant add comment'))
    }
  
   
    if(!replay.likes.includes(req.user._id)){
        return next(new Error('you didnot  like this post before'))
    }
    
    
    const data =await commentReplayModel.findByIdAndUpdate(replyId,{ $pull:{likes:req.user._id}}, {new:true})

    
    
    return res.json({message:'done' , data})
})

export{
    replay,
    UpdateReplay,
    DeleteReplay ,
    likereplay,
    Unlikereplay
}