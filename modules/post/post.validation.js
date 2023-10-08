import joi from 'joi'
import { isvalidObject } from '../../middelwares/validation.js'
// 2- Posts Collection contains fields:
// - content
// - images "optional"
// - video "optional"
// - likes ( array of objectId ref to user model )
// - createdBy ( objectId ref to user model )
// - comments ( array of objectIds ref to comment model )
// - privacy (only me or public) default public 

const addpostValidation =  joi.object({
    content: joi.string(),
  
    privacy: joi.string().valid('only' ,'public').required()
}).required()

export{
    addpostValidation
}