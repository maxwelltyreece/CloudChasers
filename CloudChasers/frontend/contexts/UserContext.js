// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchUserDetails } from '../services/fetchUserDetails';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // default user is null

    const updateDetails = async () => {
        const userDetails = await fetchUserDetails();
        if (userDetails && typeof userDetails === 'object' && userDetails.username && userDetails.email) {
            setUser({
                username: userDetails.username,
                email: userDetails.email
            });
        } else {
            console.error('Invalid user data:', userDetails);
        }
    };

    useEffect(() => {
        updateDetails();
    }, []);

    const login = () => {
        updateDetails();
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateDetails }}>
            {children}
        </UserContext.Provider>
    );
};