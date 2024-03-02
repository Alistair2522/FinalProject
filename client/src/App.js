// App.jsx

import React from "react";
import { Route, Routes, Navigate,useParams } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cal from "./components/Cal";
import Dashboard from "./components/DashBoard/DashBoard";
import Calc from "./components/Rooms/cal";
import Venues from "./components/DashBoard/Venues";
import Cal_no_input from "./components/Cal/Cal_no_input";
import Document from "./components/Document";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" element={<Main />} />}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="/calendar/:floor" element={<Calc />} />
      <Route path="/calendar" element={<Cal_no_input />} />
      <Route path="/cal" element={<Cal />} /> 
      <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<Venues />} />
        {/* Add more routes under /dashboard as needed */}
      </Route>
    </Routes>
  );
}

export default App;

