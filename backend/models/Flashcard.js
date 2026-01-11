import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required :true
    },
    documentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Document",
        required : true
    },
    question : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
},{timestamps : true})
const Flashcard = mongoose.model("Flashcard",FlashcardSchema);

export default Flashcard;