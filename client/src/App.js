// App.jsx

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cal from "./components/Cal";
import Dashboard from "./components/DashBoard/DashBoard";
import Venues from "./components/DashBoard/Venues";
//import VenuePage from "./components/DashBoard/VenuePage"; // Updated import path

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/cal" exact element={<Cal />} />
      <Route path="/Dashboard" element={<Dashboard />}>
        <Route index element={<Venues />} />
        {/* Add more routes under /Dashboard as needed */}
      </Route>
    
    </Routes>
  );
}

export default App;



///* <Route path="/venue/:venueId" element={<VenuePage />} /> */ 