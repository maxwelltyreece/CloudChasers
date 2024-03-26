/* eslint-disable no-undef */
import userService from '../../services/UserService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../../screens/IPIndex';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
}));

// Mock Axios
jest.mock('axios');

describe('userService', () => {
	// Assuming LocalIP is defined within your userService or environment. Otherwise, mock it as needed.

	const token = 'test-token';

	beforeEach(() => {
		// Clear all mocks
		AsyncStorage.getItem.mockClear();
		axios.get.mockClear();
		axios.put.mockClear();
	});

	describe('fetchUserDetails', () => {
		it('should fetch user details successfully', async () => {
			const data = { user: 'John Doe' };
			axios.get.mockResolvedValue({ data });
			AsyncStorage.getItem.mockResolvedValue(token);

			const result = await userService.fetchUserDetails(token);

			expect(axios.get).toHaveBeenCalledWith(`http://${LocalIP}:3000/userDetails`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			expect(result).toEqual(data);
		});

		// Additional tests for error cases can be added here
	});

	describe('editUserDetails', () => {
		it('should edit user details successfully', async () => {
			const field = 'name';
			const newValue = 'Jane Doe';
			AsyncStorage.getItem.mockResolvedValue(token);
			axios.put.mockResolvedValue({});

			await userService.editUserDetails(field, newValue);

			expect(axios.put).toHaveBeenCalledWith(`http://${LocalIP}:3000/updateProfile`, {
				[field]: newValue,
			}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		});

	});

	describe('fetchUserDetails Error Handling', () => {
		it('handles server error response', async () => {
			axios.get.mockRejectedValue({ response: { status: 404, data: { message: 'User not found' } } });
			AsyncStorage.getItem.mockResolvedValue(token);
      
			const result = await userService.fetchUserDetails(token);
      
			expect(result).toBeNull();
		});
      
		it('handles no server response', async () => {
			axios.get.mockRejectedValue({ request: {} });
			AsyncStorage.getItem.mockResolvedValue(token);
      
			const result = await userService.fetchUserDetails(token);
      
			expect(result).toBeNull();
		});
      
		it('handles request setup errors', async () => {
			axios.get.mockRejectedValue(new Error('Network error'));
			AsyncStorage.getItem.mockResolvedValue(token);
      
			const result = await userService.fetchUserDetails(token);
      
			expect(result).toBeNull();
		});
	});
      

});
