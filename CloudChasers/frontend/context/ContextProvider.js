import React from 'react';
import { UserProvider } from './UserContext';

export const ContextProvider = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};