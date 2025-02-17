import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from '../pages/Dekstop/components/Loading';
import Page404 from '../pages/Dekstop/pages/admin/Pages/404Page';
import Userprovider from '../pages/Dekstop/context/Userprovider';
import HistoryPost from '../pages/Dekstop/pages/admin/Pages/HistoryPost';
import HistoryPOSTProvider from '../pages/Dekstop/context/HistoryPOSTProvider';
import PaymentProvider from '../pages/Dekstop/context/PaymentProvider';

const Layout = React.lazy(() => import('../pages/Dekstop/pages/admin/Layout'));
const SuccessRegister = React.lazy(() =>
    import('../pages/Mobile/components/SuccessRegister')
);
const Membership = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Membership')
);
const MasterProduct = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/MasterProduct')
);
const Transaction = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Transaction')
);
const Location = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Location')
);
const Roles = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Roles')
);
const Payment = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Payment')
);
const Tenants = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Tenants')
);
const Login = React.lazy(() => import('../pages/Dekstop/pages/Login'));
const Dashboard = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Dashboard')
);
const ProtectedRoute = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/components/ProtectedRoute')
);
const Menu = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Menu')
);
const CardList = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/CardList')
);
const Users = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/Users')
);
const BankProvider = React.lazy(() =>
    import('../pages/Dekstop/pages/admin/Pages/BankProvider')
);

export default function DekstopAdmin() {
    return (
        <Userprovider>
            <Router>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Page404 />} />
                        <Route path="/admin" element={<Login />} />
                        <Route
                            path="/registerSuccess"
                            element={<SuccessRegister />}
                        />
                        <Route
                            path="/admin/dashboard/*"
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
                            <Route path="card-list" element={<CardList />} />
                            <Route
                                path="history-transaction"
                                element={<Transaction />}
                            />
                            <Route
                                path="history-parking"
                                element={
                                    <HistoryPOSTProvider>
                                        <HistoryPost />
                                    </HistoryPOSTProvider>
                                }
                            />
                            <Route path="location" element={<Location />} />
                            <Route path="users" element={<Users />} />
                            <Route path="roles" element={<Roles />} />
                            <Route
                                path="history-payment"
                                element={<Payment />}
                            />
                            <Route path="customer" element={<Tenants />} />
                            <Route
                                path="bank-provider"
                                element={
                                    <PaymentProvider>
                                        <BankProvider />
                                    </PaymentProvider>
                                }
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </Userprovider>
    );
}
