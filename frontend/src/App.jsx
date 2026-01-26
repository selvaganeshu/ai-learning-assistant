import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Documents from "../pages/Documents";
import UploadDocument from "../pages/UploadDocument";
import Flashcards from "../pages/Flashcard";
import Quiz from "../pages/Quiz";
import QuizHistory from "../pages/QuizHistory";
import Chat from "../pages/Chat";


function App() {
  return(
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route
      path="/documents"
      element={
      <ProtectedRoutes>
      <Documents />
      </ProtectedRoutes>
      }
      />
      <Route 
      path="/dashboard"
      element = {
        <ProtectedRoutes>
          <Dashboard/>
        </ProtectedRoutes>
      }
      />
      <Route 
      path="/upload"
      element = {
        <ProtectedRoutes>
          <UploadDocument/>
        </ProtectedRoutes>
      }
      />
      <Route
      path="/documents/:id/flashcards"
      element = {
        <ProtectedRoutes>
          <Flashcards/>
        </ProtectedRoutes>
      }
      />
      <Route 
      path="/documents/:documentId/quizzes"
      element = {
        <ProtectedRoutes>
          <Quiz/>
        </ProtectedRoutes>
      }
      />
      <Route
      path="/documents/:documentId/quiz-history"
      element = {
        <ProtectedRoutes>
          <QuizHistory/>
        </ProtectedRoutes>
      }
      />
      <Route
      path = "/documents/:documentId/chat"
      element = {
        <ProtectedRoutes>
          <Chat/>
        </ProtectedRoutes>
      }
      />
      <Route path="*" element={<Login/>}/>
    </Routes>
  )
}

export default App;

