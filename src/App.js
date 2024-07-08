import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Topup from "./pages/Topup";
import VeryfikasiPin from "./pages/VeryfikasiPin";
import Membership from "./pages/Membership";
import PaymentMember from "./pages/PaymentMember";
import Lokasi from "./pages/Lokasi";
import Voucher from "./pages/Voucher";
import Riwayat from "./pages/Riwayat";
import Profile from "./pages/Profile";
import Identitas from "./pages/Identitas";

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
          <Route path="/membership" element={<Membership />}></Route>
          <Route path="/payment_member" element={<PaymentMember />}></Route>
          <Route path="/lokasi" element={<Lokasi />}></Route>
          <Route path="/voucher" element={<Voucher />}></Route>
          <Route path="/riwayat" element={<Riwayat />}></Route>
          <Route path="/profil" element={<Profile />}></Route>
          <Route path="/input_identitas" element={<Identitas />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
