/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { AwardsProvider, useAwards } from '../../contexts/AwardsContext';
import awardsService from '../../services/AwardsService';
import { Text, Pressable } from 'react-native';

jest.mock('../../services/AwardsService', () => ({
	getAllAwards: jest.fn(),
	createAward: jest.fn(),
	getUserAwards: jest.fn(),
	getAward: jest.fn(),
	awardUser: jest.fn(),
	getAwardsToBeIssued: jest.fn(),
	getNumberOfCompletedAwards: jest.fn(),
}));

function TestConsumer() {
	const {
		awards,
		userAwards,
		fetchAwards,
		createAward,
		fetchUserAwards,
		fetchAward,
		awardUser,
		fetchAwardsToBeIssued,
		fetchNumberOfCompletedAwards,
	} = useAwards();

	const handleCreateAward = () => {
		createAward({ title: 'New Award' }).then(() => {
			fetchAwards();
		});
	};

	const handleAwardUser = () => {
		awardUser({ userId: 'user1', awardId: 'award1' }).then(() => {
			fetchUserAwards();
		});
	};

	return (
		<>
			<Pressable onPress={fetchAwards} testID="fetch-awards">Fetch Awards</Pressable>
			<Pressable onPress={handleCreateAward} testID="create-award">Create Award</Pressable>
			<Pressable onPress={fetchUserAwards} testID="fetch-user-awards">Fetch User Awards</Pressable>
			<Pressable onPress={() => fetchAward('award1')} testID="fetch-single-award">Fetch Single Award</Pressable>
			<Pressable onPress={handleAwardUser} testID="award-user">Award User</Pressable>
			<Pressable onPress={fetchAwardsToBeIssued} testID="fetch-awards-to-be-issued">Fetch Awards To Be Issued</Pressable>
			<Pressable onPress={fetchNumberOfCompletedAwards} testID="fetch-number-of-completed-awards">Fetch Number Of Completed Awards</Pressable>
			{awards?.map((award, index) => (
				<Text key={`award-${index}`}>{award.title}</Text>
			))}
			{userAwards?.map((award, index) => (
				<Text key={`userAward-${index}`}>{award.title}</Text>
			))}
		</>
	);
}


describe('AwardsContext functionality', () => {

	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
	  });
	  

	it('fetches and displays all awards', async () => {
		const mockAwards = [{ title: 'Award 1' }, { title: 'Award 2' }];
		awardsService.getAllAwards.mockResolvedValue({ data: mockAwards });

		const { findByText, getByTestId } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		fireEvent.press(getByTestId('fetch-awards'));

		await act(async () => {
			await expect(findByText('Award 1')).toBeTruthy();
			await expect(findByText('Award 2')).toBeTruthy();
		});
	});

	it('creates an award and refetches awards', async () => {
		const newAward = { title: 'New Award' };
		awardsService.createAward.mockResolvedValue({ data: newAward });
		awardsService.getAllAwards.mockResolvedValue({ data: [newAward] });

		const { getByTestId, findByText } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		fireEvent.press(getByTestId('create-award'));

		await act(async () => {
			await expect(findByText(newAward.title)).toBeTruthy();
		});

		expect(awardsService.getAllAwards).toHaveBeenCalled();
	});


	it('fetches a single award', async () => {
		const mockAward = { id: '1', title: 'Single Award' };
		awardsService.getAward.mockResolvedValue({ data: { award: mockAward } });

		const { findByText } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);


		await expect(findByText(mockAward.title)).toBeTruthy();
	});

	it('awards a user and refreshes user awards', async () => {
		awardsService.awardUser.mockResolvedValue({ data: { success: true } });
		const mockUserAwards = [{ id: '1', title: 'Awarded' }];
		awardsService.getUserAwards.mockResolvedValue({ data: { awards: mockUserAwards } });

		const { getByTestId, findByText } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		fireEvent.press(getByTestId('award-user'));

		await expect(findByText(mockUserAwards[0].title)).toBeTruthy();
	});

	it('fetches awards ready to be issued', async () => {
		const mockAwardsToBeIssued = [{ id: '1', title: 'Award Ready' }];
		awardsService.getAwardsToBeIssued.mockResolvedValue({ data: mockAwardsToBeIssued });


		const { findByText } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);


		await expect(findByText(mockAwardsToBeIssued[0].title)).toBeTruthy();
	});

	it('fetches number of completed awards', async () => {
		const mockCompletedAwardsCount = { completed: 5, total: 10 };
		awardsService.getNumberOfCompletedAwards.mockResolvedValue({ data: mockCompletedAwardsCount });

		const { findByText } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);


		await expect(findByText(`Completed: ${mockCompletedAwardsCount.completed}`)).toBeTruthy();
	});

	it('handles errors gracefully when awarding user fails', async () => {

		jest.spyOn(console, 'error').mockImplementation(() => {});

		const mockError = new Error('Failed to award user');
		awardsService.awardUser.mockRejectedValue(mockError);

		const { getByTestId } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		act(() => {
			fireEvent.press(getByTestId('award-user'));
		});

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error awarding user:'), mockError);
		});
	});

	it('handles errors gracefully when fetching awards to be issued fails', async () => {

		jest.spyOn(console, 'error').mockImplementation(() => {});

		const mockError = new Error('Failed to fetch awards to be issued');
		awardsService.getAwardsToBeIssued.mockRejectedValue(mockError);

		const { getByTestId } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		act(() => {
			fireEvent.press(getByTestId('fetch-awards-to-be-issued'));
		});

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error fetching awards to be issued:'), mockError);
		});
	});

	it('handles errors gracefully when fetching number of completed awards fails', async () => {

		jest.spyOn(console, 'error').mockImplementation(() => {});

		const mockError = new Error('Failed to fetch number of completed awards');
		awardsService.getNumberOfCompletedAwards.mockRejectedValue(mockError);

		const { getByTestId } = render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		act(() => {
			fireEvent.press(getByTestId('fetch-number-of-completed-awards'));
		});

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error fetching number of completed awards:'), mockError);
		});
	});


	it('handles error when fetching all awards fails', async () => {
		const mockError = new Error('Failed to fetch awards');
		const fetchAwards = async () => {
			try {
				await awardsService.getAllAwards();
			} catch (error) {
				console.error('Error fetching awards:', error);
			}
		};

		awardsService.getAllAwards.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		await act(async () => {
			await fetchAwards();
		});

		expect(consoleSpy).toHaveBeenCalledWith('Error fetching awards:', mockError);
	  });


	  it('handles error when creating award fails', async () => {
		const mockError = new Error('Failed to create award');
		const createAward = async (awardData) => {
			try {
				await awardsService.createAward(awardData);
			} catch (error) {
				console.error('Error creating award:', error);
			}
		};

		awardsService.createAward.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		await act(async () => {
			await createAward({ title: 'New Award' });
		});

		expect(consoleSpy).toHaveBeenCalledWith('Error creating award:', mockError);
	  });
	  

	  it('handles error when fetching user awards fails', async () => {
		const mockError = new Error('Failed to fetch user awards');
		const fetchUserAwards = async () => {
			try {
				await awardsService.getUserAwards();
			} catch (error) {
				console.error('Error fetching user awards:', error);
			}
		};

		awardsService.getUserAwards.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		await act(async () => {
			await fetchUserAwards();
		});

		expect(consoleSpy).toHaveBeenCalledWith('Error fetching user awards:', mockError);
	  });
	  
	  it('handles error when fetching a single award fails', async () => {
		const mockError = new Error('Failed to fetch award');
		const fetchAward = async (awardId) => {
			try {
				await awardsService.getAward(awardId);
			} catch (error) {
				console.error('Error fetching award:', error);
			}
		};

		awardsService.getAward.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		await act(async () => {
			await fetchAward('award1');
		});

		expect(consoleSpy).toHaveBeenCalledWith('Error fetching award:', mockError);
	  });
	  

	  it('handles error when awarding user fails', async () => {
		const mockError = new Error('Failed to award user');
		const awardUser = async (awardData) => {
			try {
				await awardsService.awardUser(awardData);
			} catch (error) {
				console.error('Error awarding user:', error);
			}
		};

		awardsService.awardUser.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		render(
			<AwardsProvider>
				<TestConsumer />
			</AwardsProvider>
		);

		await act(async () => {
			await awardUser({ userId: 'user1', awardId: 'award1' });
		});

		expect(consoleSpy).toHaveBeenCalledWith('Error awarding user:', mockError);
	  });
	  

});
