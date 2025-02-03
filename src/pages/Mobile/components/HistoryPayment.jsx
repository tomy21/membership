import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Payment } from '../../../api/apiMembershipV2';

export default function HistoryPayment({ listRiwayat }) {
    const navigate = useNavigate();
    const formatCurrency = (amount) => {
        return amount.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        });
    };

    useEffect(() => {
        fetchDataVirtualAccount();
    }, []);

    const fetchDataVirtualAccount = async () => {
        try {
            const response = await Payment.getAllHistoryVa(
                listRiwayat.virtual_account
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDetail = async (dataList) => {
        console.log(dataList);
        const response = await Payment.getAllHistoryVa(
            dataList.virtual_account
        );
        console.log(response);
        const data = {
            response: {
                data: {
                    price: response.data.paid_amount,
                    expired_date: response.data.expired_date,
                    trxId: response.data.trx_id,
                    virtual_account: response.data.virtual_account_number,
                    code_bank:
                        response.data.module_name ===
                        'BANK_NATIONAL_NOBU_VIRTUAL_ACCOUNT'
                            ? 'NOBU'
                            : 'BCA',
                },
            },
        };
        navigate('/payment_process', { state: data });
    };
    console.log(listRiwayat);
    return (
        <>
            {listRiwayat.map((items, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md w-full rounded-lg border border-slate-300 text-xs relative max-h-60 hover:bg-slate-100"
                    onClick={() => handleDetail(items)}
                >
                    <div className="absolute bg-white rounded-full h-6 w-6 -left-4 top-7 border-r border-slate-300"></div>
                    <div className="absolute bg-white rounded-full h-6 w-6 -right-4 top-7 border-l border-slate-300"></div>

                    <div className="flex justify-between items-center w-full mb-3 border-b border-dashed py-3 px-3">
                        <h1>{items.purchase_type.toUpperCase()}</h1>
                        <h3>
                            {format(
                                new Date(items?.timestamp),
                                'dd MMM yyyy HH:mm'
                            )}
                        </h3>
                    </div>

                    <div className="flex justify-start items-center text-left w-full mb-3 border-dashed border-b py-3 px-3">
                        {items?.product_name === 'TOP UP'
                            ? 'Top Up Point Member'
                            : items?.product_name}
                    </div>

                    <div className="flex justify-between items-center w-full mb-3 px-3 ">
                        <p
                            className={`text-xs font-semibold border px-3 py-2 rounded-xl ${
                                items?.statusPayment === 'PAID'
                                    ? 'text-green-600 bg-green-100'
                                    : items?.statusPayment === 'PENDING'
                                    ? 'text-yellow-600 bg-yellow-100'
                                    : items?.statusPayment === 'FAILED'
                                    ? 'text-red-600 bg-red-100'
                                    : '-'
                            }`}
                        >
                            {items?.statusPayment}
                        </p>

                        <h1 className="text-sm font-semibold">
                            {formatCurrency(parseInt(items?.price ?? 0))}
                        </h1>
                    </div>
                </div>
            ))}
        </>
    );
}
