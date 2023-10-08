


import mongoose from "mongoose";


export  function dbconnection(){

    mongoose.connect('mongodb://127.0.0.1:27017/Exam1').then(()=>{
        console.log('dbconnect...')
    }).catch((erorr)=>{
console.log(erorr)
    })


}