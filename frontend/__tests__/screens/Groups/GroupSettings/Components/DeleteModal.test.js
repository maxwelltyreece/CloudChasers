import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteModal from '../../../../../screens/Groups/GroupSettings/Components/DeleteModal';

describe('DeleteModal', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();
    const communityName = 'Test Community';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with community name', () => {
        const { getByText } = render(
            <DeleteModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                communityName={communityName}
            />
        );

        expect(getByText(`Delete ${communityName}?`)).toBeTruthy();
    });

    it('calls onConfirm when the delete button is pressed', () => {
        const { getByText } = render(
            <DeleteModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                communityName={communityName}
            />
        );

        fireEvent.press(getByText('Delete'));
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls onCancel when the cancel button is pressed', () => {
        const { getByText } = render(
            <DeleteModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                communityName={communityName}
            />
        );

        fireEvent.press(getByText('Cancel'));
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('closes the modal when the request close action is triggered', () => {
        const { getByText } = render(
            <DeleteModal
                visible={true}
                onConfirm={mockOnConfirm}
                onCancel={mockOnCancel}
                communityName={communityName}
            />
        );

        expect(getByText('Delete Test Community?')).toBeTruthy(); 
        fireEvent(getByText('Delete Test Community?'), 'onRequestClose');
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
});