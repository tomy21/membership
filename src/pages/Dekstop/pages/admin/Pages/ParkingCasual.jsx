import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';
import HeaderTitle from '../components/HeaderTitle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableCasual from '../Table/TableCasual';

export default function ParkingCasual() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <ToastContainer />
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <BarLoader size={550} color={'#e9d309'} loading={true} />
                </div>
            )}

            <HeaderTitle
                title={'History Parking Casual'}
                subtitle={'View history parking casual'}
            />

            <TableCasual />
        </>
    );
}
