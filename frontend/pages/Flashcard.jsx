import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { getFlashcards } from "../services/flashcardServices";

const Flashcards = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();

    const[flashcards,setFlashcards] = useState([]);
    const[index,setIndex] = useState(0);
    const[showAnswer,setShowAnswer] = useState(false);
    const[loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchFlashcards = async ()=>{
        try{
            const res = await getFlashcards(id);
            setFlashcards(res.data);
        }catch{
            toast.error("Failed to load flashcards");
        }finally{
            setLoading(false);
        }
        }
        fetchFlashcards();
    },[id]);

    if(loading) return <p className="p-6">Loading Flashcards</p>
    if(flashcards.length == 0){
        return <p className="p-6">No flashcards found.</p>
    }
    const card = flashcards[index];
    return(
        <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6">
            <div className="w-full max-w-xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold">Flashcards</h1>
                    <button 
                    onClick={()=> navigate(-1)}
                    className = "text-sm text-emerald-600 hover:underline"
                    >
                        Back
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow p-6 cursor-pointer
                min-h-[200px]  flex items-center justify-center text-center"
                onClick={()=> setShowAnswer(!showAnswer)}
                >
                    <p>{showAnswer ? card.answer : card.question}</p>
                </div>
                <div className="mt-3 text-center">
                    <span className={`text-sm px-3 py-1 rounded-full
                        ${card.difficuly === "hard" 
                            ? "bg-red-100 text-red-600"
                            : card.difficuly === "easy"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                            {card.difficuly || "medium"}
                    </span>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                    className="cursor-pointer"
                     disabled={index === 0}
                     onClick = {()=>{
                        setIndex(index-1)
                     }}
                     >
                        Previous
                    </button>
                    <button 
                    className="cursor-pointer"
                    onClick = {()=>{
                        if(index > flashcards.length-1){
                            setIndex(0);
                        }
                        else{
                            setIndex(index+1);
                        }
                    }}
                    >
                        Next
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-4">
                    {index+1}/{flashcards.length}
                </p>
            </div>
        </div>  
    )
}

export default Flashcards;