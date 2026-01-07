import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    fileName : {
        type : String,
        required : true,
    },
    filePath : {
        type : String,
        required : true
    },
    fileSize : {
        type : Number,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},

{ timestamps : true  }
)

const Document = mongoose.model("Document",DocumentSchema);

export default Document;