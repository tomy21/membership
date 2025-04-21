import React from 'react';
import HeaderTitle from '../components/HeaderTitle';
import TableCustomerByLocation from '../Table/TableCustomerByLocation';

export default function ListUserMembers() {
    return (
        <>
            <HeaderTitle
                title={'List Membership'}
                subtitle={'View history parking'}
            />

            <TableCustomerByLocation />
        </>
    );
}
