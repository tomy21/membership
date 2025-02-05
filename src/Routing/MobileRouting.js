// MobileRouting.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../pages/Mobile/components/ProtectedRoute';
import Loading from '../pages/Mobile/components/Loading';

// Lazy load semua halaman
const SuccessRegister = React.lazy(() =>
    import('../pages/Mobile/components/SuccessRegister')
);
const MobileLogin = React.lazy(() => import('../pages/Mobile/pages/Login'));
const MobileRegister = React.lazy(() =>
    import('../pages/Mobile/pages/Register')
);
const MobileDashboard = React.lazy(() =>
    import('../pages/Mobile/pages/Dashboard')
);
const MobileTopup = React.lazy(() => import('../pages/Mobile/pages/Topup'));
const MobileVeryfikasiPin = React.lazy(() =>
    import('../pages/Mobile/pages/VeryfikasiPin')
);
const MobileMembership = React.lazy(() =>
    import('../pages/Mobile/pages/Membership')
);
const MobilePayment = React.lazy(() =>
    import('../pages/Mobile/pages/PaymentProcess')
);
const MobilePaymentMember = React.lazy(() =>
    import('../pages/Mobile/pages/PaymentMember')
);
const DetailLokasiMember = React.lazy(() =>
    import('../pages/Mobile/pages/DetailLokasiMember')
);
const MobilCekStatusPayment = React.lazy(() =>
    import('../pages/Mobile/pages/CekStatusPayment')
);
const MobileLokasi = React.lazy(() => import('../pages/Mobile/pages/Lokasi'));
const MobileVoucher = React.lazy(() => import('../pages/Mobile/pages/Voucher'));
const MobileRiwayat = React.lazy(() => import('../pages/Mobile/pages/Riwayat'));
const MobileProfile = React.lazy(() => import('../pages/Mobile/pages/Profile'));
const MobileIdentitas = React.lazy(() =>
    import('../pages/Mobile/pages/Identitas')
);
const MobileLupaPassword = React.lazy(() =>
    import('../pages/Mobile/pages/LupaPassword')
);
const MobileResetPassword = React.lazy(() =>
    import('../pages/Mobile/pages/NewPassword')
);
const VehicleList = React.lazy(() =>
    import('../pages/Mobile/pages/VehicleList')
);

export default function MobileRouting() {
    return (
        <Router>
            {/* Suspense untuk menampilkan fallback spinner */}
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<MobileLogin />} />
                    <Route
                        path="/registerSuccess"
                        element={<SuccessRegister />}
                    />
                    <Route path="/register" element={<MobileRegister />} />
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
                        element={<MobileLupaPassword />}
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
            </Suspense>
        </Router>
    );
}
