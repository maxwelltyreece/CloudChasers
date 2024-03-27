import React, { useEffect, useState } from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import * as CommunityService from '../../services/CommunityService';
import { CommunityProvider, useCommunity } from '../../contexts/CommunityContext';
import { Button, Text } from 'react-native';

jest.mock('../../services/CommunityService');

const ConsumerComponent = () => {
    const {
        getUserCommunities,
        getAvailableCommunities,
        getCommunityDetails,
        joinCommunity,
    } = useCommunity();

    return (
        <>
            <button onPress={() => getUserCommunities()}>Get User Communities</button>
            <button onPress={() => getAvailableCommunities()}>Get Available Communities</button>
            <button onPress={() => getCommunityDetails('community1')}>Get Community Details</button>

            {/* other buttons */}
        </>
    );
};

export const TestCommunityConsumer = () => {
    const communityContext = useCommunity();
    const [result, setResult] = useState('');

    const handleCreateCommunity = async () => {
        const newCommunityData = { name: 'New Community', description: 'A new community for testing.' };
        const response = await communityContext.createCommunity(newCommunityData);
        setResult(JSON.stringify(response));
    };

    const handleDeleteCommunity = async () => {
        const communityId = 'communityIdToDelete';
        const response = await communityContext.deleteCommunity(communityId);
        setResult(JSON.stringify(response));
    };

    return (
        <>
            <Button title="Create Community" onPress={handleCreateCommunity} />
            <Button title="Delete Community" onPress={handleDeleteCommunity} />
            {/* Add more buttons for other actions */}
            <Text testID="result">{result}</Text>
        </>
    );
};

describe('CommunityContext', () => {

    beforeEach(() => {
        // Clears all instances and calls to constructor and all methods of the mock (jest.fn())
        jest.clearAllMocks();

        // Setting default mock implementations
        CommunityService.getUserCommunities.mockResolvedValue([]);
        CommunityService.getCommunityDetails.mockResolvedValue({});
        CommunityService.joinCommunity.mockResolvedValue({ success: true });
        CommunityService.getAllCommunities.mockResolvedValue([]);
        // Add more default mock implementations as needed
    });

    it('fetches and provides details for a specific community', async () => {
        const mockCommunityDetails = {
            id: 'community1',
            name: 'Test Community',
            description: 'A test community',
        };

        CommunityService.getCommunityDetails.mockResolvedValue(mockCommunityDetails);

        const TestComponent = () => {
            const { getCommunityDetails } = useCommunity();
            const [details, setDetails] = React.useState({});

            useEffect(() => {
                (async () => {
                    const data = await getCommunityDetails('community1');
                    setDetails(data);
                })();
            }, [getCommunityDetails]);

            return null;
        };

        render(
            <CommunityProvider>
                <TestComponent />
            </CommunityProvider>
        );

        await waitFor(() => {
            expect(CommunityService.getCommunityDetails).toHaveBeenCalledWith('community1');
            expect(CommunityService.getCommunityDetails).toHaveBeenCalledTimes(1);
        });
    });


    it('allows joining a community and updates user communities', async () => {
        CommunityService.joinCommunity.mockResolvedValue({ success: true });
        CommunityService.getUserCommunities.mockResolvedValue([
            { id: 'community1', name: 'Joined Community' },
        ]);

        const TestComponent = () => {
            const { joinCommunity, userCommunities } = useCommunity();

            useEffect(() => {
                (async () => {
                    await joinCommunity('community1');
                })();
            }, [joinCommunity]);

            return null;
        };

        const { unmount } = render(
            <CommunityProvider>
                <TestComponent />
            </CommunityProvider>
        );

        await waitFor(() => {
            expect(CommunityService.joinCommunity).toHaveBeenCalledWith('community1');
            expect(CommunityService.getUserCommunities).toHaveBeenCalledTimes(1);
        });

        unmount();
    });


    it('fetches and provides a list of available communities', async () => {
        const mockCommunities = [
            { id: 'community1', name: 'Community One' },
            { id: 'community2', name: 'Community Two' },
        ];

        CommunityService.getAllCommunities.mockResolvedValue(mockCommunities);

        const TestComponent = () => {
            const { getAllCommunities } = useCommunity();
            const [communities, setCommunities] = React.useState([]);

            useEffect(() => {
                (async () => {
                    const data = await getAllCommunities();
                    setCommunities(data);
                })();
            }, [getAllCommunities]);

            return null;
        };

        render(
            <CommunityProvider>
                <TestComponent />
            </CommunityProvider>
        );

        await waitFor(() => {
            expect(CommunityService.getAllCommunities).toHaveBeenCalledTimes(1);
            expect(CommunityService.getAllCommunities).toHaveBeenCalledWith(); // No arguments expected
        });
    });

    it('creates a community correctly', async () => {
        const mockCreateCommunityResponse = { success: true, message: 'Community created' };
        CommunityService.createCommunity.mockResolvedValue(mockCreateCommunityResponse);

        const { getByText, getByTestId } = render(
            <CommunityProvider>
                <TestCommunityConsumer />
            </CommunityProvider>
        );

        fireEvent.press(getByText('Create Community'));

        await waitFor(() => {
            expect(getByTestId('result').props.children).toEqual(JSON.stringify(mockCreateCommunityResponse));
        });
    });

});
