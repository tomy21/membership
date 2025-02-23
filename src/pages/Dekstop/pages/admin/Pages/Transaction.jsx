import React, { useState } from 'react';
import TransactionTable from '../Table/TransactionTable';
import TapTable from '../../../components/TapTable';
import HeaderTitle from '../components/HeaderTitle';
import { Payment } from '../../../../../api/apiMembershipV2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners';
import { apiExportData } from '../../../../../api/apiExportData';

export default function Transaction() {
    const [activeTab, setActiveTab] = useState('All');
    const [tabValue, setTabValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const listTab = [
        { name: 'All', value: 'all', id: 1 },
        { name: 'Success', value: 'PAID', id: 2 },
        { name: 'Pending', value: 'PENDING', id: 3 },
        { name: 'Failed', value: 'FAILED', id: 4 },
    ];
    const handleExport = async (startDate, endDate, location) => {
        setIsLoading(true);
        try {
            const { blob, fileName } = await apiExportData.historyTransaction(
                startDate,
                endDate,
                location,
                'MEMBERSHIP'
            );

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            toast.success('Data berhasil diunduh!', {
                position: 'top-right',
            });
        } catch (error) {
            toast.error(error, {
                position: 'top-right',
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <ToastContainer />
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <BarLoader size={550} color={'#e9d309'} loading={true} />
                </div>
            )}
            <HeaderTitle
                title={'Transaction Membership'}
                subtitle={'View Transaction'}
            />

            <TapTable
                listTab={listTab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabPage={true}
                tabValue={tabValue}
                setTabValue={setTabValue}
                exportAction={handleExport}
            />
            <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
                <TransactionTable tab={tabValue} />
            </div>
        </>
    );
}
