import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/documents");
    },
    filename : (req,file,cb)=>{
        cb(
            null,
            `${Date.now()} - ${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
        )
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/pdf'){
        cb(null,true)
    }
    else{
        cb(new Error('Only PDF files are allowed'),false);
    }
}

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
});

export default upload;