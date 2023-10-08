import multer, { diskStorage } from "multer";


export const filterObject = {
    image:['image/jpg','image/jpeg','image/png' ],
    pdf:['appliction/pdf'],
    video:['video/mp4'],
    imageAndvedio:['video/mp4','image/jpg','image/jpeg','image/png']
}

export const fileUpload = (filearray)=>{
    

const fileFilter = (req,file,cb)=>{
    if(!filearray.includes(file.mimetype) ){
  
        return cb(new Error('invalid file format!'),false)
    }else{
        cb(null , true)
  
    }
}

    return multer({storage:diskStorage({}) , fileFilter})


} 