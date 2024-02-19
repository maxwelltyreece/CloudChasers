import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

/**
 * Custom hook to access the user data and logout function from UserContext.
 * This hook simplifies the process of getting the current user and logout function,
 * and can be used in any component that needs this data.
 *
 * @returns {Object} An object containing the following properties:
 * - user: The current user object. This will be null if no user is logged in.
 * - logout: A function that can be called to log out the current user.
 *
 * @example
 * const { user, logout } = useUser();
 */
export const useUser = () => {
    const { user, logout } = useContext(UserContext);
    return { user, logout };
};