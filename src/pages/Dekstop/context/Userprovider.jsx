import React, { createContext, useContext, useEffect, useState } from 'react';
import { userCMS } from '../../../api/apiMembershipV2';

const UserContext = createContext();

export default function Userprovider({ children }) {
    const [name, setName] = useState(null);
    const [roleName, setRoleName] = useState(null);

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await userCMS.getByIdUsers();
                setName(response.data.fullname);
                setRoleName(response.data.membershipRole?.name);
            } catch (error) {
                console.log(error);
            }
        };

        if (!name) {
            fetchDataUser();
        }
    }, [name, roleName]);
    return (
        <UserContext.Provider value={{ name, roleName }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
