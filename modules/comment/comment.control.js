import { commentModel } from "../../mongoDB/modules/comment.js";
import { postModel } from "../../mongoDB/modules/posts.js";
import { Errorhandling } from "../../utilites/globalErrorHandling.js";







const AddComment = Errorhandling(async(req,res,next)=>{

const {postId,commentBody}= req.body

const post =await postModel.findById(postId)

if(!req.user._id){
    return next(new Error('authenticate first'))
}
if(!post){
    return next(new Error('post is deleted'))
}

if(req.user.isDeleted == true){
    return next(new Error('you cant add comment'))
}


const comment =  await commentModel.create({commentBody , createdBy:req.user._id ,postId })
 await postModel.findByIdAndUpdate(postId,{ comments : comment._id})

res.json({message:'done' , comment})




})
const Updatecomment = Errorhandling(async(req,res,next)=>{

    const {postId,commentBody ,commentId}= req.body

    const post =await postModel.findById(postId)
    const comment = await commentModel.findById(commentId)
    console.log(comment)
    if(!req.user._id){
        return next(new Error('authenticate first'))
    }
    if(!post){
        return next(new Error('post is deleted'))
    }
    
    if(req.user.isDeleted == true){
        return next(new Error('you cant add comment'))
    }

    if(comment.createdBy.toString() !== req.user._id.toString()) {
        return next(new Error('only owner can update comment '))
    }

    const data = await commentModel.findByIdAndUpdate(commentId ,{commentBody} ,{new :true})
    
    return res.json({message:'done' , data})






    })

    const Deletecomment= Errorhandling(async(req,res,next)=>{

        const {postId ,commentId}= req.body
    
        const post =await postModel.findById(postId)
        
        if(!req.user._id){
            return next(new Error('authenticate first'))
        }
        if(!post){
            return next(new Error('post is deleted'))
        }
        
        if(req.user.isDeleted == true){
            return next(new Error('you cant add comment'))
        }
    
        if(post.createdBy.toString() !== req.user._id.toString()) {
            return next(new Error('only owner can update comment '))
        }
    
        const data = await commentModel.findByIdAndDelete(commentId )
 await postModel.findByIdAndUpdate(postId, {$pull:{ comments :data._id}})

        
        return res.json({message:'done' , data})
    
    
    
    
    
    
        })


      const likecomment  = Errorhandling(async(req,res,next)=>{
        const {postId ,commentId}= req.body
    
        const post =await postModel.findById(postId)
        const comment =await commentModel.findById(commentId)
          
        if(!comment){
            return next(new Error('comment not found'))
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
    
       
       
        if(comment.likes.includes(req.user._id)){
            return next(new Error('you like this post before '))
        }
        
        
        const data =await commentModel.findByIdAndUpdate(commentId,{ $push:{likes:req.user._id}}, {new:true})
        
        
        return res.json({message:'done' , data})

      })
// check
const Unlikecomment =Errorhandling(async(req,res,next)=>{
    const {postId ,commentId}= req.body

    const post =await postModel.findById(postId)
    const comment =await commentModel.findById(commentId)
      
    if(!comment){
        return next(new Error('comment not found'))
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
    if(comment.createdBy.toString() !== req.user._id.toString()) {
        return next(new Error('only owner can Unlike comment  '))
    }
   
    if(!comment.likes.includes(req.user._id)){
        return next(new Error('you didnot  like this post before'))
    }
    
    
    const data =await commentModel.findByIdAndUpdate(commentId,{ $pull:{likes:req.user._id}}, {new:true})

    
    
    return res.json({message:'done' , data})
})

export{
    AddComment,
    Updatecomment,
    Deletecomment,
    likecomment,
    Unlikecomment
}