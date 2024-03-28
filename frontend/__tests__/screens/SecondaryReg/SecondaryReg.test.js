import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import RegisterDetails from '../../../screens/SecondaryReg/SecondaryReg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));
jest.mock('../../../services/ImageService', () => ({
    requestImagePermissions: jest.fn(),
    pickImage: jest.fn(),
    uploadImage: jest.fn(),
}));

// Mock useUser hook
jest.mock('../../../contexts/UserContext', () => ({
    useUser: () => ({
        editUserDetails: jest.fn(),
    }),
}));

// Mock navigation and route
const mockNavigation = {
    reset: jest.fn(),
};
const mockRoute = {
    params: {
        username: 'testUsername',
        email: 'testEmail@test.com',
        password: 'testPassword',
    },
};

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
  }));


describe('RegisterDetails Component', () => {
    beforeEach(() => {
        AsyncStorage.setItem.mockClear();
        axios.post.mockClear();
        mockNavigation.reset.mockClear();

        axios.post.mockImplementation((url, postData) => {
            if (url.endsWith('/register')) {
                return Promise.resolve({
                    data: {
                        data: {
                            _id: '123',
                        },
                    },
                });
            } else if (url.endsWith('/login')) {
                return Promise.resolve({
                    data: {
                        data: 'mocked-token',
                    },
                });
            }
            return Promise.reject(new Error('Unexpected URL'));
        });
        Alert.alert.mockClear();
    });

    it('should complete the registration process and navigate to the Main screen', async () => {
       
        const { getByPlaceholderText, getByText } = render(
            <RegisterDetails navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.changeText(getByPlaceholderText('First Name'), 'TestFirstName');
        fireEvent.changeText(getByPlaceholderText('Last Name'), 'TestLastName');

       
        fireEvent.press(getByText('Submit'));


        await waitFor(() => {

            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/register'), expect.anything());
           
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/login'), expect.anything());
           
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'mocked-token');
            
            expect(mockNavigation.reset).toHaveBeenCalledWith(expect.objectContaining({
                index: 0,
                routes: [{ name: 'Main' }],
            }));
        });
    });

    it('should show an alert when mandatory fields are empty', async () => {
        const { getByText } = render(
            <RegisterDetails navigation={mockNavigation} route={mockRoute} />
        );

       
        fireEvent.press(getByText('Submit'));

      
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill out all fields');
        });
    });
});
