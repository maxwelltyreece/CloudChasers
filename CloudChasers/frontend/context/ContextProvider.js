/**
 * ContextProvider component.
 *
 * This is a higher-order component that wraps its children with the UserProvider.
 * This allows all child components to have access to the Contexts it contains.
 *
 * @param {Object} props The properties passed to the component.
 * @param {React.ReactNode} props.children The child components to be wrapped by the UserProvider.
 * @returns {React.Element} The ContextProvider component that wraps its children with the UserProvider.
 */
import React from 'react';
import { UserProvider } from './UserContext';

export const ContextProvider = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};