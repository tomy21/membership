import React, { useState } from 'react';
import TenantTable from '../Table/TenantTable';
import TapTable from '../../../components/TapTable';
import MembershipTable from '../Table/MembershipTable';
import HeaderTitle from '../components/HeaderTitle';

export default function Tenants() {
    const [activeTab, setActiveTab] = useState('Berbayar');
    const listTab = [
        { name: 'Berbayar', id: 1 },
        // { name: 'Compliment', id: 2 },
        // { name: 'B2B', id: 3 },
    ];
    return (
        <>
            <HeaderTitle
                title={'Membership'}
                subtitle={'View List Membership'}
                setActiveTab={setActiveTab}
            />

            <TapTable
                listTab={listTab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabPage={true}
                tabName={'Tenants'}
            />

            <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
                {activeTab === 'Berbayar' ? (
                    <MembershipTable />
                ) : (
                    <TenantTable />
                )}
            </div>
        </>
    );
}
