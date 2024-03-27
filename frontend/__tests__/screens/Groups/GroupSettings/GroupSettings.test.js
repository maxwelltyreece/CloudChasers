import React from 'react';
import { fireEvent, render, waitFor, } from '@testing-library/react-native';
import GroupSettings from '../../../../screens/Groups/GroupSettings/GroupSettings';
import * as CommunityContext from '../../../../contexts/CommunityContext';
import * as ReactNavigation from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { cleanup } from '@testing-library/react-native';



// Mocks
jest.mock('../../../../contexts/CommunityContext', () => ({
    useCommunity: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

describe('GroupSettings', () => {
    const mockCommunity = { id: '123', name: 'Test Community' };
    const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };
    const mockRoute = { params: { community: mockCommunity } };

    beforeEach(() => {
        jest.clearAllMocks();
        ReactNavigation.useNavigation.mockReturnValue(mockNavigation);
    });


    afterEach(cleanup);

    it('renders correctly for an admin user', async () => {
        CommunityContext.useCommunity.mockReturnValue({
            getUserRole: jest.fn().mockResolvedValue('admin'),
            deleteCommunity: jest.fn().mockResolvedValue({ success: true }),
            leaveCommunity: jest.fn(),
            updateCommunityDesc: jest.fn().mockResolvedValue({ success: true }),
        });

        await act(async () => { // Wrap the rendering and updating in act
            const { getByText } = render(
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Stats" component={Stats} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
    
            await waitFor(() => {
                expect(getByText('You are the owner of this community')).toBeTruthy();
                expect(getByText('Update Description')).toBeTruthy();
                expect(getByText('Delete Group')).toBeTruthy();
            });
        });
    });

    it('renders correctly for a member user', async () => {
        CommunityContext.useCommunity.mockReturnValue({
            getUserRole: jest.fn().mockResolvedValue('member'),
            deleteCommunity: jest.fn(),
            leaveCommunity: jest.fn().mockResolvedValue({ success: true }),
            updateCommunityDesc: jest.fn(),
        });

        const { getByText } = render(<GroupSettings route={mockRoute} />);
        await waitFor(() => {
            expect(getByText('You are a member of this group')).toBeTruthy();
            expect(getByText('Leave Group')).toBeTruthy();
        });
    });

    it('handles leaving the group for a member', async () => {
        const mockLeaveCommunity = jest.fn().mockResolvedValue({ success: true });
        CommunityContext.useCommunity.mockReturnValue({
            getUserRole: jest.fn().mockResolvedValue('member'),
            deleteCommunity: jest.fn(),
            leaveCommunity: mockLeaveCommunity,
            updateCommunityDesc: jest.fn(),
        });

        const { getByText } = render(<GroupSettings route={mockRoute} />);
        const leaveGroupButton = await waitFor(() => getByText('Leave Group'));
        fireEvent.press(leaveGroupButton);

        await waitFor(() => {
            expect(mockLeaveCommunity).toHaveBeenCalledWith(mockCommunity.id, mockNavigation);
        });
    });

    // Add more tests as needed, such as for failing to leave a group, updating description, deleting a group, etc.
});
