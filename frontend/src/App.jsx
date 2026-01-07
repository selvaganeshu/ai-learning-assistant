import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Documents from "../pages/Documents";


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

      <Route path="*" element={<Login/>}/>
    </Routes>
  )
}

export default App;

