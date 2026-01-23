import {useState} from "react";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";
import { sendChatMessage } from "../services/chatServices.js";

const Chat = ()=>{
    const {documentId} = useParams();

    const [input,setInput] = useState("");
    const [message,setMessage] = useState([]);
    const [loading,setLoading] = useState(false);

    const sendMessages = async (e)=>{
        if(!input.trim()) return ;

        const userMsg = {role : "user", message : input};
        setMessage((prev)=> [...prev,userMsg]);
        setInput(" ");
        setLoading(true);

        try{
            const res = await sendChatMessage(documentId,userMsg.message);
            setMessage((prev)=> [
                ...prev,
                {role : "assistant",message : res.data}
            ])
        }catch(error){
            toast.error("Error in sending message");
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className ="min-h-screen bg-slate-100 p-6 flex justify-center">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow p-4 flex flex-col relative ">
                <h2 className="font-semibold text-lg mb-4"> 📄 Chat with Document</h2>

                <div className="flex flex-col gap-4 h-[80vh] ">
                    <div className="h-[450px] border overflow-y-auto flex flex-col gap-4 p-4">
                        {message.map((m,i)=>(
                        <div 
                        key={i}
                        className={`p-3 rounded-lg w-[80%]  ${
                            m.role === "user" ? "bg-emerald-100 self-start ml-auto"
                            : "bg-slate-200 self-start mr-auto"
                        }`}
                        >
                            {m.message}
                        </div>
                    ))}
                    </div>

                    {loading && (
                        <p className="text-sm text-slate-400">
                            Assistant is typing...
                        </p>
                    ) }

                    <div className="flex gap-2">
                        <input 
                        value={input} 
                        onChange={(e)=> setInput(e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2"
                        placeholder="Ask something about this document...."
                        />
                        <button 
                        onClick={sendMessages}
                        disabled = {loading}
                        className="bg-emerald-500 text-white px-4 cursor-pointer rounded-lg disabled:opacity-50">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Chat;