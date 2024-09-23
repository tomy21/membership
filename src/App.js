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
import MobilePayment from "./pages/Mobile/pages/PaymentProcess";
import MobileProfile from "./pages/Mobile/pages/Profile";
import MobileIdentitas from "./pages/Mobile/pages/Identitas";
import MobilCekStatusPayment from "./pages/Mobile/pages/CekStatusPayment";
import DetailLokasiMember from "./pages/Mobile/pages/DetailLokasiMember";
import MobileLupaPassword from "./pages/Mobile/pages/LupaPassword";
import MobileResetPassword from "./pages/Mobile/pages/NewPassword";
import DekstopLogin from "./pages/Dekstop/pages/Login";
import Transaction from "./pages/Dekstop/pages/admin/Transaction";
import Layout from "./pages/Dekstop/pages/Layout";
import Dashboard from "./pages/Dekstop/pages/dashboard/Dashboard";
import Product from "./pages/Dekstop/pages/admin/Product";
import Tenants from "./pages/Dekstop/pages/admin/Tenants";
import Membership from "./pages/Dekstop/pages/admin/Membership";
import TransactionTenants from "./pages/Dekstop/pages/client/TransactionTenants";
import ListMembership from "./pages/Dekstop/pages/client/ListMembership";
import History from "./pages/Dekstop/pages/client/History";
import ListMahasiswa from "./pages/Dekstop/pages/client/ListMahasiswa";
import ErrorPage404 from "./pages/Mobile/pages/ErrorPage404";
import Login from "./pages/Dekstop/pages/Login";
import MasterProduct from "./pages/Dekstop/pages/admin/MasterProduct";

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
                path="/payment_process"
                element={<MobilePayment />}
              ></Route>
              <Route
                path="/payment_member"
                element={<MobilePaymentMember />}
              ></Route>
              <Route
                path="/detailMember/:id"
                element={<DetailLokasiMember />}
              ></Route>
              <Route
                path="/cekStatus"
                element={<MobilCekStatusPayment />}
              ></Route>
              <Route path="/lokasi" element={<MobileLokasi />}></Route>
              <Route path="/voucher" element={<MobileVoucher />}></Route>
              <Route path="/riwayat" element={<MobileRiwayat />}></Route>
              <Route path="/profil" element={<MobileProfile />}></Route>
              <Route
                path="/input_identitas"
                element={<MobileIdentitas />}
              ></Route>
              <Route
                path="/lupapassword"
                element={<MobileLupaPassword />}
              ></Route>
              <Route
                path="/reset-password"
                element={<MobileResetPassword />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<ErrorPage404 />}></Route>
              <Route path="/dashboard/*" element={<Layout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="product" element={<Product />} />
                <Route path="client" element={<Tenants />} />
                <Route path="members" element={<Membership />} />
                <Route path="master-products" element={<MasterProduct />} />
                <Route path="transaction" element={<Transaction />} />
                <Route
                  path="tenants/transaction"
                  element={<TransactionTenants />}
                />
                <Route path="tenants/history" element={<History />} />
                <Route path="tenants/membership" element={<ListMembership />} />
                <Route
                  path="tenants/listmahasiswa"
                  element={<ListMahasiswa />}
                />
              </Route>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
