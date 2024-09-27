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
import ProtectedRoute from "./pages/Mobile/components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {isMobile ? (
            <>
              <Route path="/" element={<MobileLogin />}></Route>
              <Route path="/register" element={<MobileRegister />}></Route>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MobileDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/topup"
                element={
                  <ProtectedRoute>
                    <MobileTopup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verifikasi"
                element={
                  <ProtectedRoute>
                    <MobileVeryfikasiPin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/membership"
                element={
                  <ProtectedRoute>
                    <MobileMembership />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment_process"
                element={
                  <ProtectedRoute>
                    <MobilePayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment_member"
                element={
                  <ProtectedRoute>
                    <MobilePaymentMember />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detailMember/:id"
                element={
                  <ProtectedRoute>
                    <DetailLokasiMember />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cekStatus"
                element={
                  <ProtectedRoute>
                    <MobilCekStatusPayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lokasi"
                element={
                  <ProtectedRoute>
                    <MobileLokasi />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/voucher"
                element={
                  <ProtectedRoute>
                    <MobileVoucher />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riwayat"
                element={
                  <ProtectedRoute>
                    <MobileRiwayat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute>
                    <MobileProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/input_identitas"
                element={
                  <ProtectedRoute>
                    <MobileIdentitas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lupapassword"
                element={
                  <ProtectedRoute>
                    <MobileLupaPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <ProtectedRoute>
                    <MobileResetPassword />
                  </ProtectedRoute>
                }
              />
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
