import joi from 'joi'
import { isvalidObject } from '../../middelwares/validation.js'

const replayValidation= joi.object({
    replyBody:joi.string().required(),
    postId:joi.string().custom(isvalidObject).required(),
    commentId:joi.string().custom(isvalidObject).required(),
}).required()

const updateValidation= joi.object({
    replyBody:joi.string().required(),
    postId:joi.string().custom(isvalidObject).required(),
    commentId:joi.string().custom(isvalidObject).required(),
    replyId:joi.string().custom(isvalidObject).required(),
}).required()

const delete_like_Unlike_replay= joi.object({
    
    postId:joi.string().custom(isvalidObject).required(),
    commentId:joi.string().custom(isvalidObject).required(),
    replyId:joi.string().custom(isvalidObject).required(),
}).required()


export{
    replayValidation,
    updateValidation,
    delete_like_Unlike_replay
}