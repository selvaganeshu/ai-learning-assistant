import React from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ProtectedRoutes from "../components/ProtectedRoutes";


function App() {
  return(
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

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

