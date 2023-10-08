
import express from 'express'
import { DeleteReplay, Unlikereplay, UpdateReplay, likereplay, replay } from './commentReplay.control.js'
import { authorization } from '../../middelwares/authorization.js'
import { authentication } from '../../middelwares/authentcation.js'
import { validate } from '../../middelwares/validation.js'
import {  delete_like_Unlike_replay, replayValidation, updateValidation } from './commentReplay.validation.js'


export const  commentReplayRouter = express.Router()

commentReplayRouter.post('/replay',authentication, authorization('user') ,validate(replayValidation) ,replay)
commentReplayRouter.patch('/UpdateReplay',authentication, authorization('user') ,validate(updateValidation),UpdateReplay)
commentReplayRouter.delete('/DeleteReplay' ,authentication, authorization('user') ,validate(delete_like_Unlike_replay), DeleteReplay)
commentReplayRouter.patch('/likereplay' ,authentication, authorization('user') ,validate(delete_like_Unlike_replay),likereplay)
commentReplayRouter.patch('/Unlikereplay' ,authentication, authorization('user') ,validate(delete_like_Unlike_replay),Unlikereplay)

