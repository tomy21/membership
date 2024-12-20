import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessRegister from "../pages/Mobile/components/SuccessRegister";
import MobileLogin from "../pages/Mobile/pages/Login";
import MobileRegister from "../pages/Mobile/pages/Register";
import MobileDashboard from "../pages/Mobile/pages/Dashboard";
import MobileTopup from "../pages/Mobile/pages/Topup";
import MobileVeryfikasiPin from "../pages/Mobile/pages/VeryfikasiPin";
import MobileMembership from "../pages/Mobile/pages/Membership";
import MobilePayment from "../pages/Mobile/pages/PaymentProcess";
import MobilePaymentMember from "../pages/Mobile/pages/PaymentMember";
import DetailLokasiMember from "../pages/Mobile/pages/DetailLokasiMember";
import MobilCekStatusPayment from "../pages/Mobile/pages/CekStatusPayment";
import MobileLokasi from "../pages/Mobile/pages/Lokasi";
import MobileVoucher from "../pages/Mobile/pages/Voucher";
import MobileRiwayat from "../pages/Mobile/pages/Riwayat";
import MobileProfile from "../pages/Mobile/pages/Profile";
import MobileIdentitas from "../pages/Mobile/pages/Identitas";
import MobileLupaPassword from "../pages/Mobile/pages/LupaPassword";
import MobileResetPassword from "../pages/Mobile/pages/NewPassword";
import VehicleList from "../pages/Mobile/pages/VehicleList";
import ProtectedRoute from "../pages/Mobile/components/ProtectedRoute";

export default function MobileRouting() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobileLogin />}></Route>
        <Route path="/registerSuccess" element={<SuccessRegister />}></Route>
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
          path="/vehicle-list"
          element={
            <ProtectedRoute>
              <VehicleList />
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
      </Routes>
    </Router>
  );
}
