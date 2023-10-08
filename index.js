
import express from 'express'
import { dbconnection } from './mongoDB/DBConnection/connection.js'
import { userRouter } from './modules/user/use.router.js'
import dotenv from 'dotenv'
import { global_error_handlingh } from './utilites/globalErrorHandling.js'
import { postrouter } from './modules/post/post.router.js'
import { commentrouter } from './modules/comment/comment.router.js'
import { commentReplayRouter } from './modules/commentReplay/commentReplay.router.js'
const app = express()
const port = 2000
// const whitelist = ['http://127.0.0.1:5000']



// app.use((req,res,next)=>{

// if(req.originalUrl.includes('/confirmEmail')){
//     res.setHeader("Access-Control-Allow-Origin" , "*");
//     res.setHeader("Access-Control-Allow-Methods" , "get");
//     return next()
// }
//     if(!whitelist.includes(req.header('origin'))){
//         return next(new Error('blocked by cors'))
//     }else{
//         res.setHeader("Access-Control-Allow-Origin" , "*");
//         res.setHeader("Access-Control-Allow-Headers" , "*");
//         res.setHeader("Access-Control-Allow-Methods" , "*");
//         res.setHeader("Access-Control-Allow-Private-Network" , true);
//         return next()
//     }
// })
app.use(express.json())
app.use(userRouter)
app.use(postrouter)
app.use(commentrouter)
app.use(commentReplayRouter)
app.use(global_error_handlingh)
dotenv.config()
dbconnection()


// app.use('*', (req,res,next)=>{
//     console.log()
// })

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
