import React, { createContext, useContext, useEffect, useState } from 'react';
import { historyMembers } from '../../../api/apiUsers';

const UserMemberByLocationContext = createContext();

export default function UserMembershipProvider({ children }) {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [locationCode, setLocationCode] = useState('');

    useEffect(() => {
        if (!locationCode) return;
        const fetchData = async () => {
            try {
                const response = await historyMembers.historyByLocation(
                    locationCode,
                    page,
                    limit,
                    search
                );
                setData(response.data);
                setTotalPages(response.totalPages);
                setTotalItems(response.totalItems);
                setLimit(response.limit);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [locationCode, page, limit, search]);

    const reloadData = async () => {
        try {
            const response = await historyMembers.historyByLocation(
                locationCode,
                page,
                limit,
                search
            );
            setData(response.data);
        } catch (error) {
            alert('Failed to reload service types.');
        }
    };
    return (
        <UserMemberByLocationContext.Provider
            value={{
                data,
                page,
                limit,
                totalPages,
                totalItems,
                search,
                locationCode,
                setLimit,
                setTotalPages,
                setTotalItems,
                setSearch,
                setPage,
                setLocationCode,
                reloadData,
            }}
        >
            {children}
        </UserMemberByLocationContext.Provider>
    );
}

export const useUserLocation = () => {
    const context = useContext(UserMemberByLocationContext);
    if (!context) {
        throw new Error(
            'useHistoryPOST must be used within a HistoryPOSTProvider'
        );
    }
    return context;
};
