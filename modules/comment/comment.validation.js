

import joi from 'joi'
import { isvalidObject } from '../../middelwares/validation.js'


const Addcommentcalidation =  joi.object({
    commentBody:joi.string().required(),
    postId:joi.string().custom(isvalidObject).required(),
}).required()
const Updatecommentvalidation= joi.object({
    commentBody:joi.string().required(),
    postId:joi.string().custom(isvalidObject).required(),
    commentId:joi.string().custom(isvalidObject).required(),
}).required()

const delete_like_Unlike = joi.object({

    postId:joi.string().custom(isvalidObject).required(),
    commentId:joi.string().custom(isvalidObject).required(),
}).required()
export{
    Addcommentcalidation,
    Updatecommentvalidation,
    delete_like_Unlike
}