import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProviderPayment } from '../../../api/apiProvider';

const PaymentContext = createContext();

export default function PaymentProvider({ children }) {
    const [dataProvider, setDataProvider] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProiderPayment = async () => {
            try {
                const response = await ProviderPayment.getProvider(
                    pages,
                    limit,
                    search
                );
                console.log(response);
                setDataProvider(response.data);
                setTotalItems(response.total);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProiderPayment();
    }, [pages, limit, search]);

    const reloadDataPaymenProvider = async () => {
        try {
            const response = await ProviderPayment.getProvider(
                pages,
                limit,
                search
            );
            setDataProvider(response.data);
        } catch (error) {
            alert('Failed to reload service types.');
        }
    };

    return (
        <PaymentContext.Provider
            value={{
                dataProvider,
                pages,
                limit,
                totalPages,
                totalItems,
                search,
                setLimit,
                setTotalPages,
                setTotalItems,
                setSearch,
                setPages,
                reloadDataPaymenProvider,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
}

export const usePaymentProvider = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('PaymentContext must be used within a PaymentContext');
    }
    return context;
};
