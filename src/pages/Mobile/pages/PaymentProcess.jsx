import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Loading from '../components/Loading';
import { getIdTrx } from '../../../api/apiTrxPayment';
import { Users } from '../../../api/apiMembershipV2';
import { format } from 'date-fns';
import { IoShareSocialSharp } from 'react-icons/io5';
import { MdOutlineFileDownload } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import jsPDF from 'jspdf';
import SuccessNotif from '../components/Notifikasi/SuccessNotif';
import ErrorNotif from '../components/Notifikasi/ErrorNotif';

const formatNumber = (number) => {
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
    ];
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
};

export default function PaymentProcess() {
    const [name, setName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataStatus, setDataStatus] = useState(null);
    const location = useLocation();
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');

    const copyToClipboard = (text) => {
        const trimmedText = text.trim();
        navigator.clipboard.writeText(trimmedText).then(
            () => {
                console.log(trimmedText);
                setIsSuccess(true);
                setMessage('Berhasil di copy');
                const interval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev >= 100) {
                            clearInterval(interval); // Hentikan progress
                            setIsSuccess(false); // Tutup modal success
                        }
                        return prev + 10; // Tambahkan progress
                    });
                }, 300);
                setProgress(0);
            },
            (err) => {
                setIsError(true);
                setMessage('Gagal', err);
                const interval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev >= 100) {
                            clearInterval(interval); // Hentikan progress
                            setIsError(false); // Tutup modal success
                        }
                        return prev + 10; // Tambahkan progress
                    });
                }, 300);
                setProgress(0);
            }
        );
    };

    const amount = parseInt(
        location.state.response.data.transaction_data?.price ??
            location.state.response.data.price
    );

    const adminFee = parseInt(location.state.response.data.admin_fee ?? 0);
    const totalAmount = amount + adminFee;
    const formatAmount = formatNumber(totalAmount);
    const formattedDate = formatDate(
        location.state.response.data.transaction_data?.expired_date ??
            location.state.response.data.expired_date
    );
    const navigate = useNavigate();
    const handleCekStatus = async () => {
        const responseCek = await getIdTrx.getIdStatus(
            location.state.response.data.transaction_data?.trxId ??
                location.state.response.data.trxId
        );

        if (responseCek.statusCode === 200) {
            setIsModalOpen(true);
            setDataStatus(responseCek.data);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await Users.getByUserId();
                setName(response.data.fullname);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleBack = async () => {
        navigate('/dashboard');
    };

    const handleDownloadPDF = (dataStatus) => {
        setIsGeneratingPDF(true);

        // Membuat objek jsPDF
        const pdf = new jsPDF('p', 'pt', 'letter');

        // Warna dan gaya
        const headerBgColor = [255, 165, 0]; // Warna oranye untuk header
        const textColor = [33, 37, 41]; // Warna teks hitam
        const greyColor = [128, 128, 128]; // Warna abu-abu
        const successColor = [0, 128, 0]; // Hijau
        const warningColor = [255, 165, 0]; // Oranye
        const dangerColor = [255, 0, 0]; // Merah

        pdf.setGState(new pdf.GState({ opacity: 0.5 })); // Transparansi 50%
        pdf.setFontSize(50);
        pdf.setTextColor(200, 200, 200); // Warna abu-abu
        pdf.text('PT SKY PARKING UTAMA', 350, 450, {
            align: 'center',
            angle: 30, // Rotasi watermark
        });
        pdf.setGState(new pdf.GState({ opacity: 1 }));

        // Header
        pdf.setFillColor(...headerBgColor);
        pdf.rect(0, 0, 612, 100, 'F'); // Header background
        pdf.setFont('poppins', 'bold');
        pdf.setFontSize(24);
        pdf.setTextColor(255, 255, 255); // Warna putih untuk teks di header
        pdf.text('Invoice Pembayaran', 300, 60, { align: 'center' });

        // Menambahkan gambar logo
        const logoUrl = './assets/logo.png';
        pdf.addImage(logoUrl, 'PNG', 30, 25, 50, 50, '', 'FAST');

        // Status
        const statusText =
            dataStatus.statusPayment === 'PAID'
                ? 'Sudah Dibayarkan'
                : dataStatus.statusPayment === 'PENDING'
                ? 'Belum Dibayarkan'
                : 'Pembayaran Gagal';

        const statusColor =
            dataStatus.statusPayment === 'PAID'
                ? successColor
                : dataStatus.statusPayment === 'PENDING'
                ? warningColor
                : dangerColor;

        pdf.setFontSize(16);
        pdf.setTextColor(...statusColor);
        pdf.text(statusText, 300, 130, { align: 'center' });

        // Detail konten
        const content = [
            { label: 'Nomor Invoice', value: dataStatus.invoice_id },
            {
                label: 'Jumlah',
                value: `Rp. ${formatAmount.toLocaleString('id-ID')}`,
            },
            { label: 'Produk', value: dataStatus.purchase_type },
            {
                label: 'Metode Pembayaran',
                value: dataStatus.transactionType.replace(/_/g, ' '),
            },
            { label: 'Tanggal', value: formatDate(dataStatus.updatedAt) },
        ];

        let yPosition = 200; // Posisi awal untuk tabel

        // Tabel
        pdf.setFont('poppins', 'normal');
        pdf.setFontSize(12);
        content.forEach((item, index) => {
            pdf.setTextColor(...textColor);
            pdf.text(item.label, 100, yPosition);
            pdf.setTextColor(...greyColor);
            pdf.text(item.value, 300, yPosition);
            yPosition += 25; // Menambahkan jarak antar baris

            // Garis pemisah di setiap baris
            if (index < content.length - 1) {
                pdf.setDrawColor(200, 200, 200); // Warna garis abu-abu
                pdf.line(80, yPosition, 520, yPosition); // Garis horizontal
                yPosition += 25;
            }
        });

        // Footer
        yPosition += 40; // Tambahkan jarak sebelum footer
        pdf.setFontSize(10);
        pdf.setTextColor(...greyColor);
        pdf.text(
            'Terima kasih telah melakukan transaksi bersama kami!',
            300,
            yPosition,
            { align: 'center' }
        );

        // Branding footer
        yPosition += 20;
        pdf.setTextColor(...textColor);
        pdf.text('PT. SKY PARKING UTAMA', 300, yPosition, {
            align: 'center',
        });

        // Simpan PDF
        pdf.save(`invoice_${dataStatus.invoice_id}.pdf`);

        setIsGeneratingPDF(false);
    };

    const handleSharePDF = (dataStatus) => {
        setIsGeneratingPDF(true);

        // Membuat objek jsPDF
        const pdf = new jsPDF('p', 'pt', 'letter');

        // Warna dan gaya
        const headerBgColor = [255, 165, 0];
        const textColor = [33, 37, 41];
        const greyColor = [128, 128, 128];
        const successColor = [0, 128, 0];
        const warningColor = [255, 165, 0];
        const dangerColor = [255, 0, 0];

        pdf.setGState(new pdf.GState({ opacity: 0.5 })); // Transparansi 50%
        pdf.setFontSize(50);
        pdf.setTextColor(200, 200, 200); // Warna abu-abu
        pdf.text('PT SKY PARKING UTAMA', 350, 450, {
            align: 'center',
            angle: 30, // Rotasi watermark
        });
        pdf.setGState(new pdf.GState({ opacity: 1 }));

        // Header
        pdf.setFillColor(...headerBgColor);
        pdf.rect(0, 0, 612, 100, 'F');
        pdf.setFont('poppins', 'bold');
        pdf.setFontSize(24);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Invoice Pembayaran', 300, 60, { align: 'center' });

        const logoUrl = './assets/logo.png';
        pdf.addImage(logoUrl, 'PNG', 30, 25, 50, 50, '', 'FAST');

        // Status
        const statusText =
            dataStatus.statusPayment === 'PAID'
                ? 'Sudah Dibayarkan'
                : dataStatus.statusPayment === 'PENDING'
                ? 'Belum Dibayarkan'
                : 'Pembayaran Gagal';
        const statusColor =
            dataStatus.statusPayment === 'PAID'
                ? successColor
                : dataStatus.statusPayment === 'PENDING'
                ? warningColor
                : dangerColor;

        pdf.setFontSize(16);
        pdf.setTextColor(...statusColor);
        pdf.text(statusText, 300, 130, { align: 'center' });

        // Detail konten
        const content = [
            { label: 'Nomor Invoice', value: dataStatus.invoice_id },
            {
                label: 'Jumlah',
                value: `Rp. ${formatAmount.toLocaleString('id-ID')}`,
            },
            { label: 'Produk', value: dataStatus.purchase_type },
            {
                label: 'Metode Pembayaran',
                value: dataStatus.transactionType.replace(/_/g, ' '),
            },
            { label: 'Tanggal', value: formatDate(dataStatus.updatedAt) },
        ];

        let yPosition = 200;
        pdf.setFont('poppins', 'normal');
        pdf.setFontSize(12);
        content.forEach((item) => {
            pdf.setTextColor(...textColor);
            pdf.text(item.label, 100, yPosition);
            pdf.setTextColor(...greyColor);
            pdf.text(item.value, 300, yPosition);
            yPosition += 25;
        });

        yPosition += 40;
        pdf.setFontSize(10);
        pdf.setTextColor(...greyColor);
        pdf.text(
            'Terima kasih telah melakukan transaksi bersama kami!',
            300,
            yPosition,
            { align: 'center' }
        );
        yPosition += 20;
        pdf.setTextColor(...textColor);
        pdf.text('PT. SKY PARKING UTAMA', 300, yPosition, { align: 'center' });

        // Konversi PDF ke blob
        const pdfBlob = pdf.output('blob');

        // Membagikan PDF
        try {
            if (navigator.share) {
                const file = new File(
                    [pdfBlob],
                    `invoice_${dataStatus.invoice_id}.pdf`,
                    { type: 'application/pdf' }
                );
                navigator.share({
                    title: 'Invoice Pembayaran',
                    text: 'Berikut adalah invoice pembayaran Anda.',
                    files: [file],
                });
            } else {
                alert('Fitur berbagi tidak didukung di perangkat ini.');
            }
        } catch (error) {
            console.error('Gagal membagikan dokumen:', error);
        }

        setIsGeneratingPDF(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="bg-gray-100 min-h-screen text-left">
            {isSuccess && (
                <SuccessNotif
                    isSuccess={isSuccess}
                    progress={progress}
                    message={message}
                />
            )}

            {isError && (
                <ErrorNotif
                    isError={isError}
                    progress={progress}
                    message={message}
                />
            )}
            {/* Header */}
            <div className="w-full flex flex-col justify-center items-center py-4 bg-white shadow-sm mb-5">
                <h1 className="text-sm text-gray-500">
                    Lakukan pembayaran sebelum
                </h1>
                <h1 className="text-lg font-bold text-red-500">
                    {formattedDate}
                </h1>
            </div>

            {/* Payment Details */}
            <div className="max-w-lg mx-auto bg-white shadow-sm rounded-lg p-6 space-y-6">
                <div>
                    <h2 className="text-gray-500 text-sm">
                        Bayar ke nomor rekening virtual
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-semibold text-gray-800">
                            {location.state.response.data.transaction_data
                                ?.virtual_account ??
                                location.state.response.data.virtual_account}
                        </span>
                        <button
                            onClick={() =>
                                copyToClipboard(
                                    location.state.response.data
                                        .transaction_data?.virtual_account ??
                                        location.state.response.data
                                            .virtual_account
                                )
                            }
                            className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                        >
                            Salin
                        </button>
                    </div>
                    {location.state.bankProvider && (
                        <p className="text-sm text-gray-600 mt-1">
                            Bank {location.state.bankProvider.code_bank ?? '-'}{' '}
                            a/n {name}
                        </p>
                    )}
                </div>

                <div>
                    <h2 className="text-gray-500 text-sm">Bayar sejumlah</h2>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-2xl font-semibold text-gray-800">
                            IDR {formatAmount}
                        </span>
                        <button
                            onClick={() =>
                                copyToClipboard(
                                    location.state.response.data
                                        .transaction_data?.price ??
                                        location.state.response.data.price
                                )
                            }
                            className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
                        >
                            Salin
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Instructions */}
            <div className="max-w-lg h-full mx-auto bg-white shadow-sm rounded-lg p-6 mt-6">
                <h2 className="text-gray-500 text-sm mb-4">Cara Pembayaran</h2>
                <Accordion />

                <button
                    onClick={handleCekStatus}
                    className="w-full text-blue-600 border border-blue-600 rounded-lg py-3 mt-5 hover:bg-blue-50 transition"
                >
                    Cek Status Pembayaran
                </button>
                <button
                    onClick={handleBack}
                    className="w-full text-red-600 border border-red-600 rounded-lg py-3 mt-3 hover:bg-red-50 transition"
                >
                    Kembali
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
                    <div className="relative bg-white p-6 rounded-2xl shadow-2xl flex flex-col justify-center items-center w-[90%] max-w-md">
                        <h1
                            className="absolute top-4 right-4 text-2xl cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <CgClose />
                        </h1>
                        {/* Icon Status */}
                        {dataStatus.statusPayment === 'PAID' ? (
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-md mb-4">
                                <img
                                    src={'/assets/success.png'}
                                    alt="success"
                                    className="w-14 h-14"
                                />
                            </div>
                        ) : dataStatus.statusPayment === 'PENDING' ? (
                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center shadow-md mb-4">
                                <img
                                    src="/assets/pending.png"
                                    alt="pending"
                                    className="w-12 h-12"
                                />
                            </div>
                        ) : (
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center shadow-md mb-4">
                                <img
                                    src="/assets/delete.png"
                                    alt="delete"
                                    className="w-12 h-12"
                                />
                            </div>
                        )}

                        {/* Header Text */}
                        <div className="text-lg font-semibold text-gray-800 mb-2 text-center">
                            {dataStatus.statusPayment === 'PAID'
                                ? 'Pembayaran Berhasil'
                                : dataStatus.statusPayment === 'PENDING'
                                ? 'Pembayaran Tertunda'
                                : 'Pembayaran Gagal'}
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            {dataStatus.statusPayment === 'PAID'
                                ? `Berhasil membayar sebesar`
                                : 'Silakan lakukan pembayaran.'}
                        </p>
                        {dataStatus.statusPayment === 'PENDING' ? (
                            <div className="mb-4"></div>
                        ) : (
                            <h1 className="text-sm text-gray-500 mb-4 text-center">
                                <p>
                                    Rp. {formatAmount.toLocaleString('id-ID')}
                                </p>
                            </h1>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-200 w-full mb-4"></div>

                        {/* Detail Informasi */}
                        <div className="w-full text-xs text-gray-600 space-y-2">
                            <div className="flex justify-between">
                                <p className="font-semibold">No Invoice</p>
                                <p>{dataStatus.invoice_id}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Produk</p>
                                <p>{dataStatus.purchase_type}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Metode </p>
                                <p>{dataStatus.transactionType}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold">Tanggal</p>
                                <p>
                                    {format(
                                        dataStatus.updatedAt,
                                        'dd MMMM yyyy HH:mm:ss'
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="border-b border-slate-300 w-full my-7"></div>

                        {/* Action Buttons */}
                        {dataStatus.statusPayment === 'PAID' && (
                            <div className="flex justify-end items-center w-full space-x-5 ">
                                <IoShareSocialSharp
                                    size={25}
                                    onClick={() => handleSharePDF(dataStatus)}
                                    className="cursor-pointer text-slate-400 text-lg"
                                />

                                <div className="border-l border-slate-300 h-8"></div>

                                <MdOutlineFileDownload
                                    size={25}
                                    onClick={() =>
                                        handleDownloadPDF(dataStatus)
                                    }
                                    className="cursor-pointer text-slate-400 text-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isGeneratingPDF && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
                    Loading .....
                </div>
            )}
        </div>
    );
}
