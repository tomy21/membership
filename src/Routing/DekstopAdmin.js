import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../pages/Dekstop/pages/admin/Layout";
import SuccessRegister from "../pages/Mobile/components/SuccessRegister";
import Membership from "../pages/Dekstop/pages/admin/Pages/Membership";
import MasterProduct from "../pages/Dekstop/pages/admin/Pages/MasterProduct";
// import Product from "../pages/Dekstop/pages/admin/Pages/Product";
import Transaction from "../pages/Dekstop/pages/admin/Pages/Transaction";
import Location from "../pages/Dekstop/pages/admin/Pages/Location";
import Users from "../pages/Dekstop/pages/admin/Pages/Users";
import Roles from "../pages/Dekstop/pages/admin/Pages/Roles";
import Payment from "../pages/Dekstop/pages/admin/Pages/Payment";
import Tenants from "../pages/Dekstop/pages/admin/Pages/Tenants";
import Login from "../pages/Dekstop/pages/Login";
import Dashboard from "../pages/Dekstop/pages/admin/Pages/Dashboard";
import ProtectedRoute from "../pages/Mobile/components/ProtectedRoute";
import Menu from "../pages/Dekstop/pages/admin/Pages/Menu";

export default function DekstopAdmin() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerSuccess" element={<SuccessRegister />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="product" element={<MasterProduct />} />
          <Route path="membership" element={<Membership />} />
          <Route path="menu" element={<Menu />} />
          <Route path="history-transaction" element={<Transaction />} />
          <Route path="location" element={<Location />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="history-payment" element={<Payment />} />
          <Route path="customer" element={<Tenants />} />
        </Route>
      </Routes>
    </Router>
  );
}
