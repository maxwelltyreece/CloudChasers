/* eslint-disable no-undef */
// Import necessary libraries
import React from 'react';
import { render, act } from '@testing-library/react-native';
import { RemindersProvider, useReminders } from '../../contexts/RemindersContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
	setItem: jest.fn(),
}));

// A utility component to consume our context
function TestConsumer() {
	const { reminders } = useReminders();

	return (
		<>
			{reminders.map((reminder, index) => (
				<Text key={index}>{reminder.title}</Text>
			))}
		</>
	);
}

describe('RemindersContext', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('fetches and displays reminders', async () => {
		const mockReminders = JSON.stringify([{ title: 'Reminder 1' }, { title: 'Reminder 2' }]);
		AsyncStorage.getItem.mockResolvedValue(mockReminders);

		const { findByText } = render(
			<RemindersProvider>
				<TestConsumer />
			</RemindersProvider>
		);

		expect(await findByText('Reminder 1')).toBeTruthy();
		expect(await findByText('Reminder 2')).toBeTruthy();
	});

	it('updates reminders list', async () => {
		const initialReminders = JSON.stringify([{ title: 'Reminder 1' }]);
		AsyncStorage.getItem.mockResolvedValue(initialReminders);

		let setRemindersFunc;
		function TestUpdateConsumer() {
			const { reminders, setReminders } = useReminders();
			setRemindersFunc = setReminders;

			return (
				<>
					{reminders.map((reminder, index) => (
						<Text key={index}>{reminder.title}</Text>
					))}
				</>
			);
		}

		const { findByText, rerender } = render(
			<RemindersProvider>
				<TestUpdateConsumer />
			</RemindersProvider>
		);

		// Initially, "Reminder 1" should be rendered
		expect(await findByText('Reminder 1')).toBeTruthy();

		// Update reminders using the captured setReminders function
		act(() => {
			setRemindersFunc([{ title: 'Updated Reminder 1' }, { title: 'Reminder 2' }]);
		});

		// Rerender the consumer to reflect the updated context value
		rerender(
			<RemindersProvider>
				<TestUpdateConsumer />
			</RemindersProvider>
		);

		// Verifying the updated reminders are rendered
		expect(await findByText('Updated Reminder 1')).toBeTruthy();
		expect(await findByText('Reminder 2')).toBeTruthy();
	});
});
