import React, { useEffect, useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';
import CardHeader from '../../../components/Dashboard/CardHeader';
import { IoPeople } from 'react-icons/io5';
import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import { FaRegAddressCard, FaWallet } from 'react-icons/fa';
import { LuSquareParking } from 'react-icons/lu';
import ChartTotalMembers from '../../../components/Dashboard/ChartTotalMembers';
import ChartPie from '../../../components/Dashboard/ChartPie';
import { apiDashboard } from '../../../../../api/apiDashboard';

function Dashboard() {
    const [totalMemberActive, setTotalMemberActive] = useState(0);
    const [totalMemberNonActive, setTotalMemberNonActive] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [cardUsed, setCardUsed] = useState(0);
    const [cardUnUsed, setCardUnUsed] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiDashboard.valueDashboard();
                console.log(response);
                setTotalMemberActive(response.totalMembershipActive);
                setTotalMemberNonActive(response.totalMembershipNonActive);
                setTotalRevenue(response.totalPrice.totalPrice);
                setCardUsed(response.CardUsed);
                setCardUnUsed(response.CardNotUsed);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <HeaderTitle title={'Dashboard'} subtitle={'Overview'} />

            <div className="max-h-screen overflow-y-auto p-3">
                <div className="flex justify-between items-center w-full space-x-3 ">
                    <CardHeader
                        title={'Total Membership'}
                        value={totalMemberActive}
                        value2={totalMemberNonActive}
                        percentage={50}
                        icon={<IoPeople />}
                        label={'Active'}
                        label2={'Not Active'}
                    />
                    <CardHeader
                        title={'Total Tenant'}
                        value={'0'}
                        percentage={50}
                        icon={<HiMiniBuildingStorefront />}
                    />
                    <CardHeader
                        title={'Total Revenue'}
                        value={formatCurrency(totalRevenue)}
                        percentage={50}
                        icon={<FaWallet />}
                    />
                    <CardHeader
                        title={'Stock Card'}
                        value={cardUsed}
                        value2={cardUnUsed}
                        label={'Used'}
                        label2={'Un Used'}
                        percentage={50}
                        icon={<FaRegAddressCard />}
                    />
                    <CardHeader
                        title={'Total Parking'}
                        value={'10'}
                        value2={'10'}
                        label={'In Area'}
                        label2={'Out Area'}
                        percentage={50}
                        icon={<LuSquareParking />}
                    />
                </div>
            </div>

            <div className="flex justify-between items-start w-full p-3 space-x-3">
                <ChartTotalMembers />
                <ChartPie />
            </div>
        </>
    );
}

export default Dashboard;
