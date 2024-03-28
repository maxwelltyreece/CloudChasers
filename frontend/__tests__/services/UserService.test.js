/* eslint-disable no-undef */
import * as userService from '../../services/UserService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

	const token = 'test-token';

	beforeEach(() => {
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

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/userDetails`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			expect(result).toEqual(data);
		});

	});

	describe('userService › editUserDetails', () => {
		it('should edit user details successfully', async () => {
			axios.put.mockResolvedValue({});
			AsyncStorage.getItem.mockResolvedValue('test-token');

			const newValues = { forename: "Jane" };

			await userService.editUserDetails(newValues);

			expect(axios.put).toHaveBeenCalledWith(`http://api.gobl-up.me:80/updateProfile`,
				newValues,
				{
					headers: {
						Authorization: `Bearer test-token`,
					},
				}
			);
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
