/* eslint-disable no-undef */
import statsService from '../../services/StatsService';
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

describe('statsService', () => {
    const token = 'test-token';
    const date = '2024-03-23';

    beforeEach(() => {
        AsyncStorage.getItem.mockResolvedValue(token);
        axios.get.mockClear();
        axios.post.mockClear();
    });

    describe('getStreaks', () => {
        it('should fetch streak data successfully', async () => {
            const mockStreakData = { streak: 5 };
            axios.post.mockResolvedValue({ data: mockStreakData });

            const result = await statsService.getStreaks(date);

            expect(axios.post).toHaveBeenCalledWith(`http:${LocalIP}:3000/stats/streak`, { today: date }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            expect(result).toEqual(mockStreakData);
        });
    });

    describe('getStreaks Error Handling', () => {
        it('should handle errors when fetching streak data fails', async () => {
            const errorMessage = 'Network Error';
            axios.post.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getStreaks(date)).rejects.toThrow(errorMessage);
        });
    });

    describe('getDailyCaloricIntake', () => {
        it('should fetch daily caloric intake successfully', async () => {
            const mockCaloricData = { calories: 2000 };
            axios.get.mockResolvedValue({ data: mockCaloricData });

            const result = await statsService.getDailyCaloricIntake(date);

            expect(axios.get).toHaveBeenCalledWith(`http:${LocalIP}:3000/stats/dailyCaloricIntake?date=${date}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            expect(result.data).toEqual(mockCaloricData);
        });
    });

    describe('getDailyCaloricIntake Error Handling', () => {
        it('should handle errors when fetching daily caloric intake fails', async () => {
            const errorMessage = 'Error fetching daily caloric intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailyCaloricIntake(date)).rejects.toThrow(errorMessage);
        });

        // Error handling for getDailyCarbIntake
        it('should handle errors when fetching daily carb intake fails', async () => {
            const errorMessage = 'Error fetching daily carb intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailyCarbIntake(date)).rejects.toThrow(errorMessage);
        });
    });

    const intakeTests = [
        { fn: 'getDailyWaterIntake', endpoint: 'dailyWaterIntake', mockData: { liters: 2 } },
        { fn: 'getDailyProteinIntake', endpoint: 'dailyProteinIntake', mockData: { grams: 150 } },
        { fn: 'getDailyCarbIntake', endpoint: 'dailyCarbIntake', mockData: { grams: 250 } },
        { fn: 'getDailyFatIntake', endpoint: 'dailyFatIntake', mockData: { grams: 70 } },
        { fn: 'getDailySugarIntake', endpoint: 'dailySugarIntake', mockData: { grams: 50 } },
        { fn: 'getDailySodiumIntake', endpoint: 'dailySodiumIntake', mockData: { milligrams: 2300 } },
        { fn: 'getDailyFibreIntake', endpoint: 'dailyFibreIntake', mockData: { grams: 30 } },
    ];

    intakeTests.forEach(({ fn, endpoint, mockData }) => {
        describe(fn, () => {
            it(`should fetch ${endpoint} successfully`, async () => {
                axios.get.mockResolvedValue({ data: mockData });

                const result = await statsService[fn](date);

                expect(axios.get).toHaveBeenCalledWith(`http:${LocalIP}:3000/stats/${endpoint}?date=${date}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                expect(result.data).toEqual(mockData);
            });
        });
    });

    describe('getDailyWaterIntake Error Handling', () => {
        it('should handle errors when fetching daily water intake fails', async () => {
            const errorMessage = 'Network Error';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailyWaterIntake(date)).rejects.toThrow(errorMessage);
        });
    });

    describe('getDailyProteinIntake Error Handling', () => {
        it('should handle errors when fetching daily protein intake fails', async () => {
            const errorMessage = 'Error fetching daily protein intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailyProteinIntake(date)).rejects.toThrow(errorMessage);
        });
    });

    describe('getDailyFatIntake Error Handling', () => {
        it('should handle errors when fetching daily fat intake fails', async () => {
            const errorMessage = 'Error fetching daily fat intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailyFatIntake(date)).rejects.toThrow(errorMessage);
        });
    });

    describe('getDailySugarIntake Error Handling', () => {
        it('should handle errors when fetching daily sugar intake fails', async () => {
            const errorMessage = 'Error fetching daily sugar intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailySugarIntake(date)).rejects.toThrow(errorMessage);
        });
    });

    describe('getDailySodiumIntake Error Handling', () => {
        it('should handle errors when fetching daily sodium intake fails', async () => {
            const errorMessage = 'Error fetching daily sodium intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailySodiumIntake(date)).rejects.toThrow(errorMessage);
        });
    });

    describe('getDailyFibreIntake Error Handling', () => {
        it('should handle errors when fetching daily fibre intake fails', async () => {
            const errorMessage = 'Error fetching daily fibre intake';
            axios.get.mockRejectedValue(new Error(errorMessage));

            await expect(statsService.getDailyFibreIntake(date)).rejects.toThrow(errorMessage);
        });
    });

});

