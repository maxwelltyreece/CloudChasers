/* eslint-disable no-undef */
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
require('jest-fetch-mock').enableMocks();
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	createCommunity,
	joinCommunity,
	getCommunityDetails,
	getCommunityMembers,
	getUserRole,
	getAllCommunities,
	getUserCommunities,
	deleteCommunity,
	leaveCommunity,
	updateCommunityDesc,
	updateJoinPrivacy,
	makePost,
	getCommunityPosts,
	removeMember,
} from '../../services/CommunityService';
import { LocalIP } from '../../screens/IPIndex';

jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
}));

beforeEach(() => {
	fetch.resetMocks();
	AsyncStorage.getItem.mockResolvedValue('test-token');
});

describe('Community Service', () => {
	const communityData = { name: 'Test Community', description: 'A test community' };
	const communityId = 'test-community-id';

	it('createCommunity creates a community successfully', async () => {
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Community created' }));

		const response = await createCommunity(communityData);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/create`, expect.any(Object));
		expect(response.success).toBe(true);
		expect(response.message).toBe('Community created');
	});

	it('joinCommunity joins a community successfully', async () => {
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Joined community' }));

		const response = await joinCommunity(communityId);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/join`, expect.any(Object));
		expect(response.success).toBe(true);
	});

	it('getCommunityDetails retrieves community details successfully', async () => {
		const mockCommunityDetails = { id: communityId, name: 'Test Community', description: 'A test community' };
		fetch.mockResponseOnce(JSON.stringify(mockCommunityDetails));

		const response = await getCommunityDetails(communityId);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/details`, expect.any(Object));
		expect(response.id).toBe(communityId);
	});


	describe('getCommunityMembers retrieves community members successfully', () => {
		const communityId = 'test-community-id';
		const mockMembers = [{ id: 'member1', name: 'John Doe' }];

		it('retrieves community members successfully', async () => {
			fetch.mockResponseOnce(JSON.stringify(mockMembers), {
				headers: { 'Content-Type': 'application/json' }
			});

			const response = await getCommunityMembers(communityId);

			expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/members?communityId=${communityId}`, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer test-token',
				},
			});

			expect(response).toEqual(mockMembers);
		});
	});


	it('getUserRole retrieves the user role within a community successfully', async () => {
		const mockRole = { role: 'admin' };
		fetch.mockResponseOnce(JSON.stringify(mockRole));

		const response = await getUserRole(communityId);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/role?communityId=${communityId}`, expect.any(Object));
		expect(response).toEqual(mockRole);
	});

	it('getAllCommunities retrieves all communities successfully', async () => {
		const mockCommunities = [{ id: 'community1', name: 'Community One' }];
		fetch.mockResponseOnce(JSON.stringify(mockCommunities));

		const response = await getAllCommunities();

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/all`, expect.any(Object));
		expect(response).toEqual(mockCommunities);
	});

	it('getUserCommunities retrieves user-specific communities successfully', async () => {
		const mockUserCommunities = [{ id: 'community2', name: 'User Community' }];
		fetch.mockResponseOnce(JSON.stringify(mockUserCommunities));

		const response = await getUserCommunities();

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/userCommunities`, expect.any(Object));
		expect(response).toEqual(mockUserCommunities);
	});

	it('deleteCommunity deletes a community successfully', async () => {
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Community deleted' }));

		const response = await deleteCommunity(communityId);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/delete`, expect.any(Object));
		expect(response.success).toBe(true);
	});

	it('leaveCommunity leaves a community successfully', async () => {
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Left community' }));

		const response = await leaveCommunity(communityId);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/leave`, expect.any(Object));
		expect(response.success).toBe(true);
	});

	it('updateCommunityDesc updates a community description successfully', async () => {
		const description = 'Updated description';
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Description updated' }));

		const response = await updateCommunityDesc(communityId, description);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/updateDesc`, expect.any(Object));
		expect(response.success).toBe(true);
	});

	it('updateJoinPrivacy updates the community join privacy successfully', async () => {
		const joinPrivacy = 'private';
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Join privacy updated' }));

		const response = await updateJoinPrivacy(communityId, joinPrivacy);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/updateJoinPrivacy`, expect.any(Object));
		expect(response.success).toBe(true);
	});

	it('makePost creates a community post successfully', async () => {
		const postData = { content: 'This is a test post' };
		fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Post created' }));

		const response = await makePost(postData);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/makePost`, expect.any(Object));
		expect(response.success).toBe(true);
	});

	it('getCommunityPosts retrieves posts for a community successfully', async () => {
		const mockPosts = [{ id: 'post1', content: 'Post content' }];
		fetch.mockResponseOnce(JSON.stringify(mockPosts));

		const response = await getCommunityPosts(communityId);

		expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/posts?communityId=${communityId}`, expect.any(Object));
		expect(response).toEqual(mockPosts);
	});

	describe('removeMember', () => {
		const communityId = 'community123';
		const memberId = 'member456';

		it('successfully removes a member from the community', async () => {
			// Mock the fetch response
			fetch.mockResponseOnce(JSON.stringify({ success: true, message: 'Member removed' }));

			const response = await removeMember(communityId, memberId);

			// Verify the fetch was called with the correct parameters
			expect(fetch).toHaveBeenCalledWith(`http://${LocalIP}:3000/community/removeMember`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer test-token', // This is the mocked token value
				},
				body: JSON.stringify({ communityId, memberId }),
			});

			// Check the response
			expect(response.success).toBe(true);
			expect(response.message).toBe('Member removed');
		});

		it('handles failure when removing a member from the community', async () => {
			// Mock a failure response
			fetch.mockResponseOnce(JSON.stringify({ success: false, message: 'Failed to remove member' }), { status: 400 });

			const response = await removeMember(communityId, memberId);

			// Optionally, you could check the fetch call as in the previous test
			// For this example, we'll directly verify the failed operation's outcome
			expect(response.success).toBe(false);
			expect(response.message).toBe('Failed to remove member');
		});
	});

	// Error handling for joinCommunity
	it('joinCommunity handles errors correctly', async () => {
		fetch.mockResponseOnce(JSON.stringify({ success: false, message: 'Error joining community' }), { status: 400 });

		const response = await joinCommunity(communityId);
		expect(response.success).toBe(false);
		expect(response.message).toBe('Error joining community');
	});


});
