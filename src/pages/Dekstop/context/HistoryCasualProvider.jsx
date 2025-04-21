import React, { createContext, useContext, useEffect, useState } from 'react';
import { historyMembers } from '../../../api/apiUsers';

const HistoryCasualContext = createContext();

export default function HistoryCasualProvider({ children }) {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [month, setMonth] = useState('');
    const [totalTariff, setTotalTariff] = useState(0);
    const [listMonth, setListMonth] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await historyMembers.getHistoryCasual(
                    page,
                    limit,
                    search,
                    month
                );
                setData(response.data);
                setTotalPages(response.totalPages);
                setTotalItems(response.total);
                setListMonth(response.availableMonths);
                setTotalTariff(response.totalTariff);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [page, limit, search, month]);

    const reloadData = async () => {
        try {
            const response =
                await historyMembers.historyMembers.getHistoryCasual(
                    page,
                    limit,
                    search,
                    month
                );
            setData(response.data);
        } catch (error) {
            alert('Failed to reload service types.');
        }
    };

    return (
        <HistoryCasualContext.Provider
            value={{
                data,
                limit,
                page,
                search,
                totalPages,
                totalItems,
                month,
                listMonth,
                totalTariff,
                setPage,
                setLimit,
                setSearch,
                setTotalItems,
                setTotalPages,
                setMonth,
                setListMonth,
                setTotalTariff,
                reloadData,
            }}
        >
            {children}
        </HistoryCasualContext.Provider>
    );
}

export const useHistoryCasual = () => {
    const context = useContext(HistoryCasualContext);
    if (!context) {
        throw new Error('useHistoryCasual must be used within a HistoryCasual');
    }
    return context;
};
