import mongoose from "mongoose";

const QuizAttemptSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    documentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Document",
        required : true
    },
    score : {
        type : Number,
        required : true
    },
    totalQuestions : {
        type : Number,
        required : true
    }
},{timeStamps : true});

const QuizAttempt = mongoose.model("QuizAttempt",QuizAttemptSchema);

export default QuizAttempt;