/* eslint-disable no-undef */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import awardsService from '../../services/AwardsService'; // Adjust the import path as necessary
import { LocalIP } from '../../screens/IPIndex';


// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
}));

// Mock Axios
jest.mock('axios');

// Mock AsyncStorage to return a token
AsyncStorage.getItem.mockResolvedValue('test-token');

describe('Awards Service', () => {
	beforeEach(() => {
		axios.get.mockClear();
		axios.post.mockClear();
	});

	const awardData = { name: 'Test Award', description: 'Test Description' };
	const awardId = 'award123';
	const userId = 'user123';

	describe('createAward', () => {
		it('creates a new award successfully', async () => {
			axios.post.mockResolvedValue({ data: { success: true, award: awardData } });

			const response = await awardsService.createAward(awardData);

			expect(axios.post).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/createAward`, awardData, {
				headers: { Authorization: `Bearer test-token` },
			});
			expect(response.data.success).toBe(true);
		});
	});

	describe('getAllAwards', () => {
		it('retrieves all awards successfully', async () => {
			axios.get.mockResolvedValue({ data: [awardData] });

			const response = await awardsService.getAllAwards();

			expect(axios.get).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/getAllAwards`, {
				headers: { Authorization: `Bearer test-token` },
			});
			expect(response.data).toContainEqual(awardData);
		});
	});

	describe('getAward', () => {
		it('retrieves a single award by ID successfully', async () => {
			axios.get.mockResolvedValue({ data: awardData });

			const response = await awardsService.getAward(awardId);

			expect(axios.get).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/getAward`, {
				headers: { Authorization: `Bearer test-token` },
				params: { awardId },
			});
			expect(response.data).toEqual(awardData);
		});
	});

	describe('awardUser', () => {
		it('awards a user successfully', async () => {
			axios.post.mockResolvedValue({ data: { success: true } });

			const response = await awardsService.awardUser({ awardId, userId });

			expect(axios.post).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/awardUser`, { awardId, userId }, {
				headers: { Authorization: `Bearer test-token` },
			});
			expect(response.data.success).toBe(true);
		});
	});

	it('retrieves user\'s awards successfully', async () => {
		const mockAwards = [{ id: 'award123', name: 'Best Contributor' }];
		axios.get.mockResolvedValue({ data: mockAwards });
    
		const response = await awardsService.getUserAwards();
    
		expect(axios.get).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/getUserAwards`, {
			headers: { Authorization: `Bearer test-token` }
		});
		expect(response.data).toEqual(mockAwards);
	});
    
	it('retrieves awards to be issued successfully', async () => {
		const mockAwards = [{ id: 'award123', name: 'Continuous Learner' }];
		axios.get.mockResolvedValue({ data: mockAwards });
    
		const response = await awardsService.getAwardsToBeIssued();
    
		expect(axios.get).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/getAwardsToBeIssued`, {
			headers: { Authorization: `Bearer test-token` }
		});
		expect(response.data).toEqual(mockAwards);
	});
    
	it('retrieves the number of completed awards successfully', async () => {
		const mockCounts = { completedAwards: 5, totalAwards: 10 };
		axios.get.mockResolvedValue({ data: mockCounts });
    
		const response = await awardsService.getNumberOfCompletedAwards();
    
		expect(axios.get).toHaveBeenCalledWith(`http://${LocalIP}:3000/awards/getNumberOfCompletedAwards`, {
			headers: { Authorization: `Bearer test-token` }
		});
		expect(response.data).toEqual(mockCounts);
	});

});
