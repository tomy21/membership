import React, { useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';
import TapTable from '../../../components/TapTable';
import TransactionTable from '../Table/TransactionTable';
import TablePost from '../Table/TablePost';

export default function HistoryPost() {
    const [activeTab, setActiveTab] = useState('All');
    const [tabValue, setTabValue] = useState('All');
    const listTab = [
        { name: 'All', value: 'All', id: 1 },
        { name: 'In Area', value: '0', id: 2 },
        { name: 'Out Area', value: '1', id: 3 },
    ];
    return (
        <>
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
            />
            <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
                <TablePost tab={tabValue} />
            </div>
        </>
    );
}
