import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Topup from "./pages/Topup";
import VeryfikasiPin from "./pages/VeryfikasiPin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/topup" element={<Topup />}></Route>
          <Route path="/verifikasi" element={<VeryfikasiPin />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
