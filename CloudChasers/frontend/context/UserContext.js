import React, { createContext, useState, useEffect } from 'react';
import { fetchUserDetails } from '../services/fetchUserDetails';

/**
 * UserContext
 * 
 * This is the context object for the user's details. It is used by the useContext Hook in other components to access the user's details.
 */
export const UserContext = createContext();

/**
 * UserProvider component
 * 
 * This component provides the UserContext to its children. It fetches the user's details from the server when it mounts, and whenever the login function is called.
 * It provides the user's details, and functions to log in, log out, and update the user's details, through the UserContext.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.Component[]} props.children - The child components of this component. They will have access to the UserContext.
 * 
 * @returns {React.Component} The UserProvider component that provides the UserContext to its children.
 */
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