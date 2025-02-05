import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import TableBankProvider from '../Table/TableBankProvider';

export default function BankProvider() {
    return (
        <>
            <HeaderTitle
                title={'Bank Provider'}
                subtitle={'Monitoring and management of bank provider'}
            />

            <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
                <TableBankProvider />
            </div>
        </>
    );
}
