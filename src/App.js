import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { isMobile } from "react-device-detect";
import MobileLogin from "./pages/Mobile/pages/Login";
import MobileRegister from "./pages/Mobile/pages/Register";
import MobileDashboard from "./pages/Mobile/pages/Dashboard";
import MobileTopup from "./pages/Mobile/pages/Topup";
import MobileVeryfikasiPin from "./pages/Mobile/pages/VeryfikasiPin";
import MobileMembership from "./pages/Mobile/pages/Membership";
import MobilePaymentMember from "./pages/Mobile/pages/PaymentMember";
import MobileLokasi from "./pages/Mobile/pages/Lokasi";
import MobileVoucher from "./pages/Mobile/pages/Voucher";
import MobileRiwayat from "./pages/Mobile/pages/Riwayat";
import MobileProfile from "./pages/Mobile/pages/Profile";
import MobileIdentitas from "./pages/Mobile/pages/Identitas";
import DekstopLogin from "./pages/Dekstop/pages/Login";
import DekstopDashboard from "./pages/Dekstop/pages/admin/Dashboard";
import DekstopDashboardClient from "./pages/Dekstop/pages/client/DashboardClient";
import HistoryTransaction from "./pages/Dekstop/pages/client/HistoryTransaction";
import Location from "./pages/Dekstop/pages/client/Location";
import Transaction from "./pages/Dekstop/pages/admin/Transaction";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {isMobile ? (
            <>
              <Route path="/" element={<MobileLogin />}></Route>
              <Route path="/register" element={<MobileRegister />}></Route>
              <Route path="/dashboard" element={<MobileDashboard />}></Route>
              <Route path="/topup" element={<MobileTopup />}></Route>
              <Route
                path="/verifikasi"
                element={<MobileVeryfikasiPin />}
              ></Route>
              <Route path="/membership" element={<MobileMembership />}></Route>
              <Route
                path="/payment_member"
                element={<MobilePaymentMember />}
              ></Route>
              <Route path="/lokasi" element={<MobileLokasi />}></Route>
              <Route path="/voucher" element={<MobileVoucher />}></Route>
              <Route path="/riwayat" element={<MobileRiwayat />}></Route>
              <Route path="/profil" element={<MobileProfile />}></Route>
              <Route
                path="/input_identitas"
                element={<MobileIdentitas />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<DekstopLogin />}></Route>
              <Route path="/register" element={<MobileRegister />}></Route>
              <Route path="/dashboard" element={<DekstopDashboard />}></Route>
              <Route
                path="/dashboard-client"
                element={<DekstopDashboardClient />}
              ></Route>
              <Route path="/topup" element={<MobileTopup />}></Route>
              <Route
                path="/verifikasi"
                element={<MobileVeryfikasiPin />}
              ></Route>
              <Route path="/membership" element={<MobileMembership />}></Route>
              <Route
                path="/payment_member"
                element={<MobilePaymentMember />}
              ></Route>
              <Route path="/lokasi" element={<MobileLokasi />}></Route>
              <Route path="/voucher" element={<MobileVoucher />}></Route>
              <Route path="/riwayat" element={<MobileRiwayat />}></Route>
              <Route path="/profil" element={<MobileProfile />}></Route>
              <Route
                path="/input_identitas"
                element={<MobileIdentitas />}
              ></Route>
              <Route path="/history" element={<HistoryTransaction />}></Route>
              <Route path="/location" element={<Location />}></Route>
              <Route path="/transaction" element={<Transaction />}></Route>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
