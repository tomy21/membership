import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../pages/Dekstop/pages/admin/Layout";
import SuccessRegister from "../pages/Mobile/components/SuccessRegister";
import Login from "../pages/Dekstop/pages/Login";
import Dashboard from "../pages/Dekstop/pages/admin/Dashboard";
import MasterProduct from "../pages/Dekstop/pages/admin/MasterProduct";
import Membership from "../pages/Dekstop/pages/admin/Membership";
import Product from "../pages/Dekstop/pages/admin/Product";
import Transaction from "../pages/Dekstop/pages/admin/Transaction";
import Location from "../pages/Dekstop/pages/admin/Location";
import Users from "../pages/Dekstop/pages/admin/Users";
import Roles from "../pages/Dekstop/pages/admin/Roles";
import TransactionTenants from "../pages/Dekstop/pages/client/TransactionTenants";
import Tenants from "../pages/Dekstop/pages/admin/Tenants";

export default function DekstopAdmin() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerSuccess" element={<SuccessRegister />} />
        <Route path="/dashboard/*" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="product" element={<MasterProduct />} />
          <Route path="membership" element={<Membership />} />
          <Route path="master-products" element={<Product />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="location" element={<Location />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="tenants/transaction" element={<TransactionTenants />} />
          <Route path="customer" element={<Tenants />} />
        </Route>
      </Routes>
    </Router>
  );
}
