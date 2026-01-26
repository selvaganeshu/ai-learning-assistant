
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDocuments } from "../services/documentServices.js";
import { useNavigate } from "react-router-dom";
import { deleteDocument,downloadDocument } from "../services/documentServices.js";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data);
      } catch (error) {
        toast.error("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  const handleDelete = async (documentId) => {
     const confirmDelete = window.confirm(
    "Are you sure you want to delete this document?"
  );
    if (!confirmDelete) return;
    try{
      await deleteDocument(documentId);
      setDocuments((prev)=> prev.filter((doc)=> doc._id !== documentId));
      toast.success("Document deleted successfully");
    }catch(error){
      toast.error("Failed to delete document");
    }
  }

  if (loading) {
    return <p className="p-6">Loading documents...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Documents</h1>
            <p className="text-slate-600">
              Manage and organize your learning materials
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 cursor-pointer
            text-white rounded-lg transition"
          >
            + Upload Document
          </button>
        </div>

        {documents.length === 0 ? (
          <p className="text-slate-500">No documents uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc._id} doc={doc} handleDelete={handleDelete} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Documents;



const DocumentCard = ({ doc,handleDelete }) => {
   const navigate = useNavigate();
  const fileSizeKB = doc.fileSize
    ? (doc.fileSize / 1024).toFixed(1)
    : "—";

    const handleDownload = async(doc)=>{
    try{
      const blob = await downloadDocument(doc._id);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = doc.title + ".pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    }catch{
      toast.error("Failed to download document");
    }
  }
   
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 relative">
      <button
      onClick={()=> handleDelete(doc._id)}
        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 cursor-pointer"
        title="Delete (coming soon)"
      >
        🗑️
      </button>

    
      <div onClick={()=> handleDownload(doc)}
      className="w-10 h-10 bg-emerald-100 text-emerald-600
      rounded-lg flex items-center justify-center mb-4 cursor-pointer">
        📄
      </div>

     
      <h3 className="font-semibold truncate">{doc.title}</h3>

      <p className="text-sm text-slate-500 mt-1">
        {fileSizeKB} KB
      </p>

      
      <div className="flex gap-4 mt-3 text-sm">
        <span className="text-purple-600">📘{doc.flashcardCount} Flashcards</span>
        <span className="text-emerald-600">🧠 {doc.quizCount} Quizzes</span>
      </div>
      <button 
      onClick={()=> navigate(`/documents/${doc._id}/flashcards`)}
      className = "mt-3 text-sm text-emerald-600 cursor-pointer hover:underline"
      >
        View Flashcards 
      </button>
      <button 
      onClick={()=> navigate(`/documents/${doc._id}/quizzes`)}
      className = "mt-3 text-sm text-emerald-600 cursor-pointer hover:underline"
      >
        View Quizzes 
      </button>
      <p className="text-xs text-slate-400 mt-3">
        Uploaded {timeAgo(doc.createdAt)}
      </p>
    </div>
  );
};



const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) {
      return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
