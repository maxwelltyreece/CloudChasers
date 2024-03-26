// /* eslint-disable no-undef */
// // Import necessary testing and react libraries
// import React from 'react';
// import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
// import { CommunityProvider, useCommunity } from '../../contexts/CommunityContext';
// import * as CommunityService from '../../services/CommunityService';
// import { Text, Pressable } from 'react-native';

// // Mock the CommunityService
// jest.mock('../../services/CommunityService', () => ({
//     getUserCommunities: jest.fn(),
//     getAllCommunities: jest.fn(),
//     getCommunityDetails: jest.fn(),
//     getCommunityMembers: jest.fn(),
//     getUserRole: jest.fn(),
//     createCommunity: jest.fn(),
//     joinCommunity: jest.fn(),
//     deleteCommunity: jest.fn(),
//     leaveCommunity: jest.fn(),
//     updateCommunityDesc: jest.fn(),
//     updateJoinPrivacy: jest.fn(),
//     getCommunityImage: jest.fn(),
//     makePost: jest.fn(),
//     getCommunityPosts: jest.fn(),
//     removeMember: jest.fn(),
//     acceptRequest: jest.fn(),
//     denyRequest: jest.fn(),
//     getPendingRequests: jest.fn(),
//     getCommunityRecipes: jest.fn(),
// }));

// // Define a TestConsumer component to trigger and display context values and functions
// function TestConsumer() {
//     const {
//         userCommunities,
//         getUserCommunities,
//         getAllCommunities,
//         joinCommunity,
//         leaveCommunity,
//         updateCommunityDesc,
//         updateJoinPrivacy,
//         getCommunityImage,
//         makePost,
//         getCommunityPosts,
//         removeMember,
//         acceptRequest,
//         denyRequest,
//         getPendingRequests,
//         getCommunityRecipes,
//     } = useCommunity();

//     const handleJoinCommunity = () => {
//         joinCommunity("test-community-id");
//     };

//     return (
//         <>
//             <Pressable onPress={getUserCommunities} testID="fetch-user-communities">Fetch User Communities</Pressable>
//             <Pressable onPress={getAllCommunities} testID="fetch-all-communities">Fetch All Communities</Pressable>
//             <Pressable onPress={handleJoinCommunity} testID="join-community">Join Community</Pressable>
//             <Pressable onPress={leaveCommunity} testID="leave-community">Leave Community</Pressable>
//             <Pressable onPress={updateCommunityDesc} testID="update-community-desc">Update Community Description</Pressable>
//             <Pressable onPress={updateJoinPrivacy} testID="update-join-privacy">Update Join Privacy</Pressable>
//             <Pressable onPress={getCommunityImage} testID="get-community-image">Get Community Image</Pressable>
//             <Pressable onPress={makePost} testID="make-post">Make Post</Pressable>
//             <Pressable onPress={getCommunityPosts} testID="get-community-posts">Get Community Posts</Pressable>
//             <Pressable onPress={removeMember} testID="remove-member">Remove Member</Pressable>
//             <Pressable onPress={acceptRequest} testID="accept-request">Accept Request</Pressable>
//             <Pressable onPress={denyRequest} testID="deny-request">Deny Request</Pressable>
//             <Pressable onPress={getPendingRequests} testID="get-pending-requests">Get Pending Requests</Pressable>
//             <Pressable onPress={getCommunityRecipes} testID="get-community-recipes">Get Community Recipes</Pressable>
//             {userCommunities.map((community, index) => (
//                 <Text key={`community-${index}`}>{community.name}</Text>
//             ))}
//         </>
//     );
// }

// // Begin describe block for CommunityContext tests
// describe('CommunityContext functionality', () => {

//     beforeEach(() => {
//         jest.resetAllMocks();
//     });

//     it('fetches and displays user communities', async () => {
//         const mockCommunities = [{ name: 'Community 1' }, { name: 'Community 2' }];
//         CommunityService.getUserCommunities.mockResolvedValue({ data: mockCommunities });

//         const { findByText, getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('fetch-user-communities'));

//         await act(async () => {
//             expect(await findByText(mockCommunities[0].name)).toBeTruthy();
//             expect(await findByText(mockCommunities[1].name)).toBeTruthy();
//         });
//     });

//     // Continue describe block for CommunityContext tests
// describe('CommunityContext functionality', () => {

//     // Test for getUserCommunities function
//     it('fetches user communities', async () => {
//         const mockCommunities = [{ name: 'Community 1' }, { name: 'Community 2' }];
//         CommunityService.getUserCommunities.mockResolvedValue({ data: mockCommunities });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('fetch-user-communities'));

//         await waitFor(() => {
//             expect(CommunityService.getUserCommunities).toHaveBeenCalled();
//         });
//     });

//     // Test for getAvailableCommunities function
//     it('fetches available communities', async () => {
//         const mockCommunities = [{ name: 'Community 1' }, { name: 'Community 2' }];
//         CommunityService.getAllCommunities.mockResolvedValue({ success: true, data: mockCommunities });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('fetch-all-communities'));

//         await waitFor(() => {
//             expect(CommunityService.getAllCommunities).toHaveBeenCalled();
//         });
//     });

//     // Test for joinCommunity function
//     it('joins a community', async () => {
//         CommunityService.joinCommunity.mockResolvedValue({ success: true });

//         const mockSuccess = { success: true };
//         CommunityService.joinCommunity.mockResolvedValue(mockSuccess);
//         const consoleSpy = jest.spyOn(console, 'log');
//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );
//         fireEvent.press(getByTestId('join-community'));
//         await waitFor(() => {
//             expect(CommunityService.joinCommunity).toHaveBeenCalledWith("test-community-id");
//             expect(consoleSpy).toHaveBeenCalledWith('Successfully joined community');
//         });

//     });

//     // Test for leaveCommunity function
//     it('leaves a community', async () => {
//         CommunityService.leaveCommunity.mockResolvedValue({ success: true });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('leave-community'));

//         await waitFor(() => {
//             expect(CommunityService.leaveCommunity).toHaveBeenCalled();
//         });
//     });

//     // Test for updateCommunityDesc function
//     it('updates a community description', async () => {
//         CommunityService.updateCommunityDesc.mockResolvedValue({ success: true });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('update-community-desc'));

//         await waitFor(() => {
//             expect(CommunityService.updateCommunityDesc).toHaveBeenCalled();
//         });
//     });

//     // Test for updateJoinPrivacy function
//     it('updates a community join privacy', async () => {
//         CommunityService.updateJoinPrivacy.mockResolvedValue({ success: true });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('update-join-privacy'));

//         await waitFor(() => {
//             expect(CommunityService.updateJoinPrivacy).toHaveBeenCalled();
//         });
//     });

//     // Test for getCommunityImage function
//     it('gets a community image', async () => {
//         CommunityService.getCommunityImage.mockResolvedValue({ status: "success" });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('get-community-image'));

//         await waitFor(() => {
//             expect(CommunityService.getCommunityImage).toHaveBeenCalled();
//         });
//     });

//     // Test for makePost function
//     it('makes a post', async () => {
//         CommunityService.makePost.mockResolvedValue({ success: true });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('make-post'));

//         await waitFor(() => {
//             expect(CommunityService.makePost).toHaveBeenCalled();
//         });
//     });
// });
//     it('gets community posts', async () => {
//         CommunityService.getCommunityPosts.mockResolvedValue({ data: 'success' });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('get-community-posts'));

//         await act(async () => {
//             expect(CommunityService.getCommunityPosts).toHaveBeenCalled();
//         });
//     });

//     it('removes a member', async () => {
//         CommunityService.removeMember.mockResolvedValue({ data: 'success' });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('remove-member'));

//         await act(async () => {
//             expect(CommunityService.removeMember).toHaveBeenCalled();
//         });
//     });

//     it('accepts a request', async () => {
//         CommunityService.acceptRequest.mockResolvedValue({ data: 'success' });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('accept-request'));

//         await act(async () => {
//             expect(CommunityService.acceptRequest).toHaveBeenCalled();
//         });
//     });

//     it('denies a request', async () => {
//         CommunityService.denyRequest.mockResolvedValue({ data: 'success' });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('deny-request'));

//         await act(async () => {
//             expect(CommunityService.denyRequest).toHaveBeenCalled();
//         });
//     });

//     it('gets pending requests', async () => {
//         CommunityService.getPendingRequests.mockResolvedValue({ data: 'success' });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('get-pending-requests'));

//         await act(async () => {
//             expect(CommunityService.getPendingRequests).toHaveBeenCalled();
//         });
//     });

//     it('gets community recipes', async () => {
//         CommunityService.getCommunityRecipes.mockResolvedValue({ data: 'success' });

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('get-community-recipes'));

//         await act(async () => {
//             expect(CommunityService.getCommunityRecipes).toHaveBeenCalled();
//         });
//     });

//     it('handles errors gracefully when joining a community fails', async () => {
//         const mockError = new Error('Failed to join community');
//         CommunityService.joinCommunity.mockRejectedValue(mockError);

//         const consoleErrorSpy = jest.spyOn(console, 'error');

//         const { getByTestId } = render(
//             <CommunityProvider>
//                 <TestConsumer />
//             </CommunityProvider>
//         );

//         fireEvent.press(getByTestId('join-community'));

//         await waitFor(() => {
//             expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything(), mockError);
//         });
//     });



// });
