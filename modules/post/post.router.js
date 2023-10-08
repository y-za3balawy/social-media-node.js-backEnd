

import express from "express";
import { authentication } from "../../middelwares/authentcation.js";
import { authorization } from "../../middelwares/authorization.js";
import { validate } from "../../middelwares/validation.js";
import { Addpost, UpdatePostPrivacy, allposts, deletepost, getPostById, likePost, unlikePost, updatepost } from "./post.control.js";
import { addpostValidation } from "./post.validation.js";
import { fileUpload, filterObject } from "../../utilites/multer.js";



export const  postrouter = express.Router()



postrouter.post('/Addpost' , authentication, authorization('user'), fileUpload(filterObject.imageAndvedio).array('imageAndvedio' ), validate(addpostValidation), Addpost)
postrouter.patch('/updatepost' , authentication, authorization('user'), fileUpload(filterObject.imageAndvedio).single('imageAndvedio' ),  updatepost)
postrouter.delete('/deletepost' ,authentication,authorization('user') ,deletepost)
postrouter.get('/allposts' ,authentication , authorization('user'),allposts),
postrouter.get('/getPostById',authentication , authorization('user'),getPostById )
postrouter.patch('/likePost',authentication , authorization('user') ,likePost)
postrouter.patch('/unlikePost',authentication , authorization('user') , unlikePost)
postrouter.patch('/UpdatePostPrivacy' ,authentication , authorization('user'), UpdatePostPrivacy)