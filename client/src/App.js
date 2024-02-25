import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cal from "./components/Cal";
import Dashboard from "./components/DashBoard/DashBoard";
function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/cal" exact element={<Cal />} />
      <Route path="/DashBoard" exact element={<Dashboard />} />

    </Routes>
  );
}

export default App;