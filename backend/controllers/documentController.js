import Document from '../models/Document.js';

export const uploadDocument = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success : false,
                error : "Please upload a document"
            })
        }

        const {title} = req.body;

        if(!title){
            return res.status(400).json({
                success : false,
                error : "Please provide a title for the document"
            })
        }

        const document = await Document.create({
            title,
            filePath : req.file.path,
            fileName : req.file.filename,
            userId : req.user._id
        })

        res.status(201).json({
            success : true,
            data : document
        })
    }catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            error : "Server Error"
        })
    }
}