
import nodemailer from 'nodemailer'
// import { htmlcode } from '../email.later/email.later.js';
// import  Jwt  from 'jsonwebtoken';





export const sendemail = async ({to , subject , html , attachments})=>{


    const transporter = nodemailer.createTransport({
      
        service:'gmail' ,
          auth: {
          
            user: process.env.email,
            pass: process.env.emailPass
          }
        });
      
      
    //   const token =   Jwt.sign({email: option.email}, 'yousef')  
        
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <yzabalawy@gmail.com>', // sender address
            to,  // list of receivers
            subject, // Subject line
            text: "Hello world?", // plain text body
            html, // html body
          });
      
      
        //   console.log("Message sent: %s", info.messageId);
      
      return info.accepted.length<1?false:true  
        

}