import React, { useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';
import TapTable from '../../../components/TapTable';
import TransactionTable from '../Table/TransactionTable';
import TablePost from '../Table/TablePost';
import { saveAs } from 'file-saver';
import { Payment } from '../../../../../api/apiMembershipV2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners';

export default function HistoryPost() {
    const [activeTab, setActiveTab] = useState('All');
    const [tabValue, setTabValue] = useState('All');
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    const listTab = [
        { name: 'All', value: 'All', id: 1 },
        { name: 'In Area', value: '0', id: 2 },
        { name: 'Out Area', value: '1', id: 3 },
        { name: 'Casual', value: '2', id: 4 },
    ];
    const handleExport = async (startDate, endDate, location) => {
        setIsLoading(true);
        try {
            const { blob, fileName } = await Payment.exportDataPOST(
                startDate,
                endDate,
                location
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
                title={'History Parking'}
                subtitle={'View history parking'}
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
                {tabValue === '2' ? (
                    <TablePost tab={'1'} tabStatus={'NON-MEMBER'} />
                ) : (
                    <TablePost tab={tabValue} tabStatus={null} />
                )}
            </div>
        </>
    );
}
