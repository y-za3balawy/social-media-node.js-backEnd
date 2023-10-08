

import express from 'express'
import { authentication } from '../../middelwares/authentcation.js'
import { authorization } from '../../middelwares/authorization.js'
import { AddComment, Deletecomment, Unlikecomment, Updatecomment, likecomment } from './comment.control.js'
import { validate } from "../../middelwares/validation.js";
import { Addcommentcalidation, Updatecommentvalidation, delete_like_Unlike } from './comment.validation.js';

export const commentrouter = express.Router()


commentrouter.post('/AddComment' ,authentication, authorization('user') ,validate(Addcommentcalidation),  AddComment)
commentrouter.patch('/Updatecomment',authentication, authorization('user') ,validate(Updatecommentvalidation) ,Updatecomment)
commentrouter.delete('/Deletecomment' ,authentication, authorization('user') ,validate(delete_like_Unlike) ,Deletecomment)
commentrouter.patch('/likecomment' ,authentication, authorization('user') ,validate(delete_like_Unlike),likecomment)
commentrouter.patch('/Unlikecomment' ,authentication, authorization('user') ,validate(delete_like_Unlike),Unlikecomment)
