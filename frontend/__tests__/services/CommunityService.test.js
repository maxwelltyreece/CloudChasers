/* eslint-disable no-undef */
import axios from 'axios';
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
	getCommunityRecipes,
	removeMember,
} from '../../services/CommunityService';


jest.mock('axios');


jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
	getItem: jest.fn(),
}));


describe('Community Service', () => {
	const communityData = { name: 'Test Community', description: 'A test community' };
	const communityId = 'test-community-id';

	beforeEach(() => {
		axios.mockClear();
		AsyncStorage.getItem.mockResolvedValue('test-token');
	});

	it('createCommunity creates a community successfully', async () => {
		axios.post.mockResolvedValue({
			status: 200,
			data: { success: true, message: 'Community created' }
		});
      
		const response = await createCommunity(communityData);
      
        
		expect(axios.post).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Community created');
	});
      


	it('joinCommunity joins a community successfully', async () => {
		axios.post.mockResolvedValue({ data: { success: true, message: 'Joined community' } });

		const response = await joinCommunity(communityId);
		const response = await joinCommunity(communityId);

		expect(axios.post).toHaveBeenCalled();
		expect(response.success).toBe(true);
	});

	it('getCommunityDetails retrieves community details successfully', async () => {
		const mockCommunityDetails = { id: communityId, name: 'Test Community', description: 'A test community' };
		axios.get.mockResolvedValue({ data: mockCommunityDetails });

		const response = await getCommunityDetails(communityId);
		const response = await getCommunityDetails(communityId);

		expect(axios.get).toHaveBeenCalled();
		expect(response.id).toBe(communityId);
	});

	// Add more tests for other functions in your community service

	// Example test for handling errors
	it('handles errors correctly', async () => {
		axios.post.mockRejectedValue(new Error('An error occurred'));

		const response = await createCommunity(communityData);

		expect(axios.post).toHaveBeenCalled();
		expect(response).toBe(false); // Assuming that your function returns false in case of errors
	});

	it('getCommunityMembers retrieves community members successfully', async () => {
		const mockMembers = [{ id: 'member1', name: 'John Doe' }];
		axios.get.mockResolvedValue({ data: mockMembers });

		const response = await getCommunityMembers(communityId);

		expect(axios.get).toHaveBeenCalled();
		expect(response).toEqual(mockMembers);
	});

	it('getUserRole retrieves the user role within a community successfully', async () => {
		const mockRole = { role: 'admin' };
		axios.get.mockResolvedValue({ data: mockRole });

		const response = await getUserRole(communityId);
		const response = await getUserRole(communityId);

		expect(axios.get).toHaveBeenCalled();
		expect(response).toEqual(mockRole);
	});


	it('getAllCommunities retrieves all communities successfully', async () => {
		const mockCommunities = [{ id: 'community1', name: 'Community One' }];
		axios.get.mockResolvedValue({ data: mockCommunities });

		const response = await getAllCommunities();
		const response = await getAllCommunities();

		expect(axios.get).toHaveBeenCalled();
		expect(response).toEqual(mockCommunities);
	});


	it('getUserCommunities retrieves user communities successfully', async () => {
		const mockCommunities = [{ id: 'community1', name: 'Community One' }];
		axios.get.mockResolvedValue({ data: mockCommunities });

		const response = await getUserCommunities();
		const response = await getUserCommunities();

		expect(axios.get).toHaveBeenCalled();
		expect(response).toEqual(mockCommunities);
	});

	// Continuing from the previous tests...

	it('deleteCommunity deletes a community successfully', async () => {
		axios.put.mockResolvedValue({ data: { success: true, message: 'Community deleted' } });

		const response = await deleteCommunity(communityId);
		const response = await deleteCommunity(communityId);

		expect(axios.put).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Community deleted');
	});

	it('leaveCommunity leaves a community successfully', async () => {
		axios.put.mockResolvedValue({ data: { success: true, message: 'Left community' } });

		const response = await leaveCommunity(communityId);
		const response = await leaveCommunity(communityId);

		expect(axios.put).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Left community');
	});

	it('updateCommunityDesc updates a community description successfully', async () => {
		axios.put.mockResolvedValue({ data: { success: true, message: 'Description updated' } });

		const response = await updateCommunityDesc(communityId, 'New description');

		expect(axios.put).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Description updated');
	});

	it('updateJoinPrivacy updates the community join privacy successfully', async () => {
		axios.put.mockResolvedValue({ data: { success: true, message: 'Join privacy updated' } });

		const response = await updateJoinPrivacy(communityId, 'private');

		expect(axios.put).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Join privacy updated');
	});

	it('makePost creates a community post successfully', async () => {
		const postData = { content: 'Test post' };
		axios.post.mockResolvedValue({ data: { success: true, message: 'Post created' } });

		const response = await makePost(postData);
		const response = await makePost(postData);

		expect(axios.post).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Post created');
	});

	it('getCommunityPosts retrieves posts for a community successfully', async () => {
		const mockPosts = [{ id: 'post1', content: 'Post content' }];
		axios.get.mockResolvedValue({ data: mockPosts });

		const response = await getCommunityPosts(communityId);
		const response = await getCommunityPosts(communityId);

		expect(axios.get).toHaveBeenCalled();
		expect(response).toEqual(mockPosts);
	});

	it('removeMember successfully removes a member from the community', async () => {
		axios.put.mockResolvedValue({ data: { success: true, message: 'Member removed' } });

		const memberId = 'test-member-id';
		const response = await removeMember(communityId, memberId);

		expect(axios.put).toHaveBeenCalled();
		expect(response.success).toBe(true);
		expect(response.message).toBe('Member removed');
	});

	// Add more tests for acceptRequest, denyRequest, getPendingRequests, getCommunityRecipes as needed

	// Example for getCommunityRecipes
	it('getCommunityRecipes retrieves recipes for a community successfully', async () => {
		const mockRecipes = [{ id: 'recipe1', name: 'Recipe Name' }];
		axios.get.mockResolvedValue({ data: mockRecipes });

		const response = await getCommunityRecipes(communityId);

		expect(axios.get).toHaveBeenCalled();
		expect(response).toEqual(mockRecipes);
	});

	// Continuing from the previous tests...

	it('createCommunity handles server errors gracefully', async () => {
		axios.post.mockRejectedValue({ response: { status: 500, data: { message: 'Internal Server Error' } } });

		const response = await createCommunity(communityData);

		expect(axios.post).toHaveBeenCalled();
		expect(response).toBe(false); // Assuming that your function returns false in case of server errors
	});

	it('joinCommunity handles unauthorized access correctly', async () => {
		axios.post.mockRejectedValue({ response: { status: 401, data: { message: 'Unauthorized' } } });

		const response = await joinCommunity(communityId);

		expect(axios.post).toHaveBeenCalled();
		expect(response).toBe(false); // Assuming unauthorized attempts return false
	});

	it('getCommunityDetails handles not found error correctly', async () => {
		axios.get.mockRejectedValue({ response: { status: 404, data: { message: 'Community not found' } } });

		const response = await getCommunityDetails(communityId);

		expect(axios.get).toHaveBeenCalled();
		expect(response).toBe(false); // Assuming that a not found error returns false
	});

	it('deleteCommunity handles forbidden action gracefully', async () => {
		axios.put.mockRejectedValue({
			response: { status: 403, data: { message: 'Forbidden' } }
		});
    
		const response = await deleteCommunity(communityId);
        
		expect(axios.put).toHaveBeenCalled();
		expect(response.success).toBe(false);
		expect(response.message).toBe('Forbidden');
	});

});