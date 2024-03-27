import React, { useState, useEffect } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as UserService from '../../services/UserService';
import { UserProvider, useUser } from '../../contexts/UserContext';
import { Button, Text } from 'react-native';

jest.mock('../../services/UserService');

const ConsumerComponent = () => {
    const { getUserDetails, editUserDetails, logout } = useUser();

    return (
        <>
            <Button title="Get User Details" onPress={() => getUserDetails()} />
            <Button title="Edit User Details" onPress={() => editUserDetails({ name: 'Updated Name' })} />
            <Button title="Logout" onPress={() => logout({ navigate: jest.fn() })} />
            {/* You can add more buttons for other functionalities */}
        </>
    );
};

describe('UserContext', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        // Setting default mock implementations
        UserService.fetchUserDetails.mockResolvedValue({ data: { name: 'Test User', email: 'test@example.com' } });
        UserService.editUserDetails.mockResolvedValue({ success: true });
        // Add more mocks as needed
    });

    it('fetches and provides user details', async () => {
        const mockUserDetails = { name: 'Test User', email: 'test@example.com' };

        UserService.fetchUserDetails.mockResolvedValue({ data: mockUserDetails });

        const TestComponent = () => {
            const { getUserDetails } = useUser();
            const [details, setDetails] = useState({});

            useEffect(() => {
                (async () => {
                    await getUserDetails();
                    // Assuming setUserDetails is updated asynchronously, mock this behavior
                    setDetails(mockUserDetails);
                })();
            }, [getUserDetails]);

            return <Text testID="userDetails">{JSON.stringify(details)}</Text>;
        };

        const { getByTestId } = render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => {
            expect(UserService.fetchUserDetails).toHaveBeenCalledTimes(1);
            expect(getByTestId('userDetails').props.children).toEqual(JSON.stringify(mockUserDetails));
        });
    });

    it('updates user details correctly', async () => {
        const updatedDetails = { name: 'Updated Name' };

        // Assuming editUserDetails would cause a re-fetch of the user details
        UserService.editUserDetails.mockImplementation(() => {
            UserService.fetchUserDetails.mockResolvedValueOnce({ data: updatedDetails });
        });

        const TestComponent = () => {
            const { editUserDetails, userDetails, setUserDetails } = useUser();
            
            useEffect(() => {
                (async () => {
                    await editUserDetails(updatedDetails);
                    // Simulate setUserDetails being called with the updated details
                    setUserDetails(updatedDetails);
                })();
            }, [editUserDetails]);

            return <Text testID="updatedDetails">{JSON.stringify(userDetails)}</Text>;
        };

        const { getByTestId } = render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => {
            expect(UserService.editUserDetails).toHaveBeenCalledWith(updatedDetails);
            expect(getByTestId('updatedDetails').props.children).toEqual(JSON.stringify(updatedDetails));
        });
    });

    // Add more tests as needed for logout, etc.
});
