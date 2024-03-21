import React, { createContext, useState } from 'react';
import { getUser, getUserDetails, getUserDays } from '../services/DashboardService';
import PropTypes from 'prop-types';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [userDays, setUserDays] = useState(null);

    const fetchUser = async () => {
        try {
            console.log('Fetching user...');
            const response = await getUser();
            if (response && response.success) {
                setUser(response.user);
            } else {
                console.error('Failed to fetch user:', response);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchUserDetails = async () => {
        console.log('...Fetching user details...');
        try {
            console.log('Fetching user details...');
            const response = await getUserDetails();
            console.log('Response:', response);
            if (response) {
                setUserDetails(response);
            } else {
                console.error('Failed to fetch user details:', response);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchUserDays = async () => {
        try {
            const response = await getUserDays();
            if (response && response.success) {
                setUserDays(response.userDays);
            } else {
                console.error('Failed to fetch user days:', response);
            }
        } catch (error) {
            console.error('Error fetching user days:', error);
        }
    };

    return (
        <DashboardContext.Provider value={{ user, userDetails, userDays, fetchUser, fetchUserDetails, fetchUserDays }}>
            {children}
        </DashboardContext.Provider>
    );
};

DashboardProvider.propTypes = {
    children: PropTypes.node.isRequired,
};