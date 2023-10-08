
import express from 'express'
import { authentication } from '../../middelwares/authentcation.js'
import { authorization } from '../../middelwares/authorization.js'
import { registration, confirmEmail, logIn, userProfile, updateProfile, addpicture, addCoverPictures, AddVedio, softDelete, forgetPassword, resetPassword } from './user.control.js'
import { validate } from '../../middelwares/validation.js'
import { login_schema, registration_schema,userProfile_schema } from './user.validation.js'
import { fileUpload, filterObject } from '../../utilites/multer.js'




export const userRouter = express.Router()


userRouter.post('/registration' , validate(registration_schema) ,registration)
userRouter.get('/confirmEmail/:activationCode' ,confirmEmail    )
userRouter.post('/logIn' ,validate(login_schema),  logIn)
userRouter.get('/userProfile' , authentication ,authorization('user') , validate(userProfile_schema),userProfile)
userRouter.put('/updateProfile' , authentication , authorization('user') ,  updateProfile)
userRouter.post('/addpicture' ,authentication , authorization('user') , fileUpload(filterObject.image).single('profilePicture') ,addpicture)
userRouter.put('/addCoverPictures' ,authentication , authorization('user') , fileUpload(filterObject.image).single('coverpictures') ,addCoverPictures)
userRouter.put('/AddVedio' , authentication , authorization('user') , fileUpload(filterObject.video).single('vedio') ,AddVedio)
userRouter.put('/softDelete' , authentication ,authorization('user') ,softDelete )
userRouter.patch('/forgetPassword',  validate(userProfile_schema),forgetPassword)
userRouter.patch('/resetPassword'  , resetPassword)