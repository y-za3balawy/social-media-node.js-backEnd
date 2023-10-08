import joi from'joi'





const registration_schema = joi.object({
    firstName: joi.string().max(10).required(),
    lastName:  joi.string().max(10).required(),
    email:joi.string().email({tlds:{allow:['com', 'za3balawy']}}).required() ,
    phone: joi.number().required(),
    password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    repassword: joi.string().required().valid(joi.ref("password")),
    age: joi.number().required().min(8).max(90),
}).required()


const login_schema = joi.object({
   
    email:joi.string().email({tlds:{allow:['com', 'za3balawy']}}).required() ,
    password: joi.string().required()
 
}).required()


const userProfile_schema =joi.object({
   
    email:joi.string().email({tlds:{allow:['com', 'za3balawy']}}).required() ,

 
}).required()


export{
    registration_schema,
    login_schema,
    userProfile_schema
}