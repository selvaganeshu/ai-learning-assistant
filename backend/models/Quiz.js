import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
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
    questions: [
      {
        question: { type: String, required: true },
        options: {
          type: [String],
          validate: (v) => v.length === 4,
        },
        correctAnswer: { type: String, required: true },
      },
    ],
},
{
    timestamps : true
}
)

const Quiz = mongoose.model("Quiz",quizSchema);
export default Quiz;