import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUsers } from '../../../../../api/apiUsers';

const ProtectedRoute = ({ children }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await apiUsers.verifyToken();

                if (response.status === 'success') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate('/admin');
                }
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/');
            }

            setAuthChecked(true);
        };

        if (!authChecked) {
            checkAuth();
        }
    }, [authChecked, navigate]);

    if (!authChecked) {
        return null;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
