import React, { createContext, useContext, useEffect, useState } from 'react';
import { historyMembers } from '../../../api/apiUsers';

const HistoryPOSTContext = createContext();

export default function HistoryPOSTProvider({ children }) {
    const [historyPOST, setHistoryPOST] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchHistoryPOST = async () => {
            try {
                const response = await historyMembers.getHistoryPost(
                    page,
                    limit,
                    search,
                    status
                );
                console.log(response);
                setHistoryPOST(response.data);
                setTotalPages(response.totalPages);
                setTotalItems(response.total);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHistoryPOST();
    }, [page, limit, search, status]);

    const reloadDataHistoryPost = async () => {
        try {
            const response = await historyMembers.getHistoryPost(
                page,
                limit,
                search
            );
            setHistoryPOST(response.data);
        } catch (error) {
            alert('Failed to reload service types.');
        }
    };

    return (
        <HistoryPOSTContext.Provider
            value={{
                historyPOST,
                page,
                limit,
                totalPages,
                totalItems,
                search,
                status,
                setLimit,
                setTotalPages,
                setTotalItems,
                setSearch,
                setPage,
                setStatus,
                reloadDataHistoryPost,
            }}
        >
            {children}
        </HistoryPOSTContext.Provider>
    );
}

export const useHistoryPOST = () => {
    const context = useContext(HistoryPOSTContext);
    if (!context) {
        throw new Error(
            'useHistoryPOST must be used within a HistoryPOSTProvider'
        );
    }
    return context;
};
