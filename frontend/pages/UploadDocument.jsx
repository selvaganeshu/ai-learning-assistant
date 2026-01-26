import {useState,useEffect} from "react";
import toast from "react-hot-toast";
import { uploadDocuments } from "../services/documentServices.js";
import {useNavigate} from "react-router-dom";

const UploadDocument = ()=>{
    const navigate = useNavigate();
    const [file,setFile] = useState(null);
    const [title,setTitle] = useState("");
    const [uploading,setUploading] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault(); 

        if(!file || !title){
        toast.error("Title and file are required");
        return;
        }

        const formData = new FormData();
        formData.append("title",title);
        formData.append("document",file);

        try{
            setUploading(true);
            await uploadDocuments(formData);
            toast.success("Document uploaded successfully");
            navigate("/documents");
        }catch(error){
            toast.error(error.response?.data?.message || "Failed to upload document");
        }
        finally{
            setUploading(false);
        }
    }

    return(
        <div className="min-h-screen flex bg-slate-100 p-6 justify-center items-center">
            <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
                <input 
                type="text"
                placeholder="Document title"
                value = {title}
                onChange={(e)=> setTitle(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 w-full mb-4"
                 />
                 <input 
                 type="file"
                 accept="application/pdf"
                 onChange={(e)=> setFile(e.target.files[0])}
                 className="w-full mb-4 border border-slate-300 rounded-lg px-3 py-2"
                  />

                  <button
                  type = "submit"
                  disabled = {uploading}
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg px-3 py-2 cursor-pointer disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Upload Document"}
                  </button>
            </form>
        </div>
    )
}

export default UploadDocument;