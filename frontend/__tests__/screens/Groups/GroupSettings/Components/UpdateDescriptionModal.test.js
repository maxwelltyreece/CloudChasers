import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UpdateDescriptionModal from '../../../../../screens/Groups/GroupSettings/Components/UpdateDescriptionModal';

describe('UpdateDescriptionModal', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();
    const mockOnDescriptionChange = jest.fn();
    const initialDescription = 'Initial description';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with initial state', () => {
        const { getByPlaceholderText, getByText } = render(
            <UpdateDescriptionModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                onDescriptionChange={mockOnDescriptionChange}
                description={initialDescription}
            />
        );

        expect(getByPlaceholderText('New description').props.value).toBe(initialDescription);
        expect(getByText('Update')).toBeTruthy();
        expect(getByText('X')).toBeTruthy();
    });

    it('calls onDescriptionChange when the description is changed', () => {
        const { getByPlaceholderText } = render(
            <UpdateDescriptionModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                onDescriptionChange={mockOnDescriptionChange}
                description={initialDescription}
            />
        );

        fireEvent.changeText(getByPlaceholderText('New description'), 'Updated description');
        expect(mockOnDescriptionChange).toHaveBeenCalledWith('Updated description');
    });

    it('calls onConfirm when the update button is pressed', () => {
        const { getByText } = render(
            <UpdateDescriptionModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                onDescriptionChange={mockOnDescriptionChange}
                description={initialDescription}
            />
        );

        fireEvent.press(getByText('Update'));
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when the close button is pressed', () => {
        const { getByText } = render(
            <UpdateDescriptionModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                onDescriptionChange={mockOnDescriptionChange}
                description={initialDescription}
            />
        );

        fireEvent.press(getByText('X'));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});
