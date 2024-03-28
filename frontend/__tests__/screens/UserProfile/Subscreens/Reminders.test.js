import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import Reminders from '../../../../screens/UserProfile/Subscreens/Reminders/Reminders';
import { RemindersProvider } from '../../../../contexts/RemindersContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import e from 'express';

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

const renderWithProvider = (component) => {
    return render(<RemindersProvider>{component}</RemindersProvider>);
};

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

describe('Reminders', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('loads reminders on mount', async () => {
        const storedReminders = JSON.stringify([{ id: '1', description: 'Test Reminder', time: '9:00 AM' }]);
        AsyncStorage.getItem.mockResolvedValue(storedReminders);

        const { findByText } = renderWithProvider(<Reminders />);

        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith('REMINDERS');
        });

        expect(await findByText('Test Reminder')).toBeTruthy();
    });

    it('saves new reminder to storage', async () => {
        const { getByTestId, getByText } = renderWithProvider(<Reminders />);
        const addReminderButton = getByText('Add Reminder');

        fireEvent.press(addReminderButton);

        await act(async () => {
            const descriptionInput = getByTestId('description-input');
            fireEvent.changeText(descriptionInput, 'New Reminder');
            const timePickerButton = getByTestId('time-picker-button');
            fireEvent.press(timePickerButton);

            const doneButton = getByTestId('done-button');
            fireEvent.press(doneButton);
        });

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('REMINDERS', expect.anything());
        });
    });



    it('opens the modal to add a new reminder', async () => {
        const { getByText, getByTestId } = renderWithProvider(<Reminders />);
        fireEvent.press(getByText('Add Reminder'));
        expect(getByTestId('description-input')).toBeTruthy();
    });

    it('allows a user to set a reminder time', async () => {
        const { getByTestId } = renderWithProvider(<Reminders />);
        fireEvent.press(getByTestId('add-reminder-button'));

        await act(async () => {
            fireEvent.changeText(getByTestId('description-input'), 'New Reminder');
            fireEvent.press(getByTestId('time-picker-button'));
        });

        expect(getByTestId('description-input').props.value).toBe('New Reminder');
    });


    it('handles frequency selection', async () => {
        const { getByText, getByTestId } = renderWithProvider(<Reminders />);

        await act(async () => {

            fireEvent.press(getByText('Add Reminder'));

        });
        expect(getByTestId('description-input')).toBeTruthy();

        await act(async () => {

            fireEvent.press(getByText('Weekly'));
            expect(getByTestId('frequency-selector')).toBeTruthy();
            expect(getByText('Weekly')).toBeTruthy();
            expect(getByText('Daily')).toBeTruthy();
        });
    });

    it('alerts the user if a reminder addition fails due to missing information', async () => {

        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByTestId } = renderWithProvider(<Reminders />);

        fireEvent.press(getByTestId('add-reminder-button'));
        fireEvent.press(getByTestId('done-button'));

        expect(alertSpy).toHaveBeenCalledWith(
            'Missing Information',
            'You cannot add a reminder without a description and a time.'
        );
    });


});




