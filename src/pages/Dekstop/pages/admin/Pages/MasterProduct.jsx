import React, { useState } from 'react';
import MasterProductTable from '../Table/MasterProductTable';
import TapTable from '../../../components/TapTable';
import HeaderTitle from '../components/HeaderTitle';
import AddMasterProduct from '../Table/modal/AddMasterProduct';

export default function MasterProduct() {
    const [activeTab, setActiveTab] = useState('All');
    const [tabValue, setTabValue] = useState('All');
    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const listTab = [
        { id: 1, name: 'All', value: 'All' },
        { id: 2, name: 'Mobil', value: 'MOBIL' },
        { id: 3, name: 'Motor', value: 'MOTOR' },
    ];

    const handleAdd = () => {
        setIsModalAdd(true);
    };

    const handleCloseModal = () => {
        setIsModalAdd(false);
    };

    return (
        <>
            <HeaderTitle
                title={'Product'}
                subtitle={'View List Product'}
                setActiveTab={activeTab}
            />

            <TapTable
                listTab={listTab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabPage={true}
                tabValue={tabValue}
                setTabValue={setTabValue}
                add={true}
                addAction={handleAdd}
            />

            <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
                <MasterProductTable
                    isSuccess={isSuccess}
                    setIsSuccess={setIsSuccess}
                    listTab={tabValue}
                />
            </div>

            {isModalAdd && (
                <AddMasterProduct
                    isOpen={isModalAdd}
                    onClose={handleCloseModal}
                    onSuccess={setIsSuccess}
                />
            )}
        </>
    );
}
