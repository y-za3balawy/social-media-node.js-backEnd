
import { commentModel } from "../../mongoDB/modules/comment.js";
import { commentReplayModel } from "../../mongoDB/modules/commentReplay.js";
import cloudinary from "../../utilites/cloud.js";
import { Errorhandling } from "../../utilites/globalErrorHandling.js";
import { postModel } from './../../mongoDB/modules/posts.js';
import { nanoid } from 'nanoid';






const Addpost = Errorhandling(async(req,res,next)=>{

    const createdBy = req.user._id


const {content , privacy } = req.body
    
let images =[];
let video =[];

const postIdOncloudinary = nanoid()
for (const postuploades of req.files) {
 
    const {public_id , secure_url} =await cloudinary.uploader.upload( postuploades.path ,{ resource_type:'auto', folder:`${process.env.folder_cloude}/posts/${postIdOncloudinary}`})
    
    if(postuploades.mimetype == 'video/mp4' ){
        video.push({id:public_id,url:secure_url})
    }else{
        images.push({id:public_id,url:secure_url})

    }


}


const data = await postModel.create({content , privacy ,createdBy ,images,video,postIdOncloudinary})
 
if(!data){
   return next(new Error('cant create post'))
}

return res.json({message:'done', data})


})


const updatepost = Errorhandling(async (req,res,next)=>{

const {postId, content , privacy ,mediaId }= req.body
// ==>>> mediaId images or video 
const post = await postModel.findById(postId)

if(!post){
   return next(new Error('post not found'))
}

if(post.createdBy.toString() !== req.user._id.toString()){
   return next(new Error('only owner can update this post'))

}

await postModel.findByIdAndUpdate(postId ,{content , privacy } ,{new:true})
 
if(req.file){
    
    const {public_id , secure_url} =await cloudinary.uploader.upload( req.file.path ,{ public_id:mediaId, resource_type:'auto'})

    if(req.file.mimetype == 'video/mp4' ){
        const  data = await postModel.findOneAndReplace({video:{id:public_id}},{video:{id:public_id ,url:secure_url}} )

        return res.json({message:'done' , data})
    }else{
        
        const  data = await postModel.findOneAndReplace({images:{id:public_id}},{images:{id:public_id ,url:secure_url}} )
        return res.json({message:'done' , data})

    }

}

return res.json({message:'done' })




})



//  comments
const deletepost =  Errorhandling(async (req,res,next)=>{

    const {postId }= req.body
    // ==>>> mediaId images or video 
    const post = await postModel.findById(postId)
   
    if(!post){
       return next(new Error('post not found'))
    }
    
    if(post.createdBy.toString() !== req.user._id.toString()){
       return next(new Error('only owner can update this post'))
    
    }

    //`${process.env.folder_cloude}/posts/gaUudHonpejEvOHQY0YTe`
// console.log(post.postIdOncloudinary)
    // const  data = await cloudinary.api.delete_folder()

    await postModel.findByIdAndDelete(postId)

   const comment =  await commentModel.findOne({postId:post._id})
console.log("comment",comment)
   if(comment){
     await commentModel.findOneAndDelete({postId:post._id})
   }

   
   const replay =  await commentReplayModel.findOneAndDelete({commentId:comment._id})
console.log("replay",replay)
   if(replay){
     await commentReplayModel.findByIdAndDelete(replay._id)
   }



   

     return res.json({message:'done' })


})
//  falsetrue
const allposts=Errorhandling(async(req,res,next)=>{

   
 
     const data = await postModel.find().populate([{path:"createdBy"} ,{path:"comments"} ])
console.log(data)
let posts=[]
data.map((ele)=>{
     if(ele.createdBy.isDeleted==false){

        posts.push(ele)

     }

})
console.log(posts)


  return   res.json({message:'done' ,posts})

   


})


const getPostById=Errorhandling(async(req,res,next)=>{

 const {postId} = req.body  
 
const post = await postModel.findById(postId)

if(!post){
   return next(new Error('post not found'))
}

res.json({message:'done' , post})

})

const likePost= Errorhandling(async (req,res,next)=>{

const {postId} = req.body

const post =await postModel.findById(postId)
// console.log(post.likes)
if(post.likes.includes(req.user._id)){
    return next(new Error('you like this post before '))
}


const data =await postModel.findByIdAndUpdate(postId,{ $push:{likes:req.user._id}}, {new:true})


return res.json({message:'done' , data})



})

const unlikePost = Errorhandling(async (req,res,next)=>{

const {postId}= req.body
const post =await postModel.findById(postId)

if(!post.likes.includes(req.user._id)){
    return next(new Error('you didnot  like this post before'))
}


const data =await postModel.findByIdAndUpdate(postId,{ $pull:{likes:req.user._id}}, {new:true})


return res.json({message:'done' , data})


})

const UpdatePostPrivacy = Errorhandling(async(req,res,next)=>{
    const {postId ,privacy}= req.body
    
const post = await postModel.findById(postId)

if(post.createdBy.toString() !== req.user._id.toString()) {
    return next(new Error('only owner can change privacy'))
}

   const data = await postModel.findByIdAndUpdate(postId ,{privacy}  , {new :true}) 


   return res.json({message:'done' , data})

})

export{
    Addpost,
    updatepost,
    deletepost,
    allposts,
    getPostById,
    likePost,
    unlikePost,
    UpdatePostPrivacy
  
}