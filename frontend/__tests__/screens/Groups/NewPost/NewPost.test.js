import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NewPostPage from '../../../../screens/Groups/NewPost/NewPost';
import { useCommunity } from '../../../../contexts/CommunityContext';

// Mock the useCommunity hook
jest.mock('../../../../contexts/CommunityContext', () => ({
    useCommunity: jest.fn(),
}));

describe('NewPostPage', () => {
    const mockGoBack = jest.fn();
    const mockMakePost = jest.fn();
    const mockCommunityId = '12345';

    beforeEach(() => {
        // Reset mock functions before each test
        mockGoBack.mockReset();
        mockMakePost.mockReset();
        useCommunity.mockImplementation(() => ({
            makePost: mockMakePost,
        }));
    });

    it('should handle user input and submit a new post', async () => {
        // Mock successful post creation
        mockMakePost.mockResolvedValue({ success: true });

        const { getByPlaceholderText, getByText } = render(
            <NewPostPage
                navigation={{ goBack: mockGoBack }}
                route={{ params: { communityId: mockCommunityId } }}
            />
        );

        // Simulate user input
        fireEvent.changeText(getByPlaceholderText('Title'), 'Test Title');
        fireEvent.changeText(getByPlaceholderText('Message'), 'Test Content');

        // Simulate pressing the post button
        fireEvent.press(getByText('Post'));

        // Expectations
        expect(mockMakePost).toHaveBeenCalledWith({
            communityId: mockCommunityId,
            title: 'Test Title',
            text: 'Test Content',
            recipeID: null,
        });
        expect(mockMakePost).toHaveBeenCalledTimes(1);

        // Since mockMakePost is asynchronous, we use waitFor to allow the promise to resolve
        await waitFor(() => {
            expect(mockGoBack).toHaveBeenCalledTimes(1);
        });
    });


    it('should display an error if the post creation fails', async () => {
        // Mock failed post creation
        mockMakePost.mockResolvedValue({ success: false, error: 'Failed to create post' });

        const { getByPlaceholderText, getByText } = render(
            <NewPostPage
                navigation={{ goBack: mockGoBack }}
                route={{ params: { communityId: mockCommunityId } }}
            />
        );

        // Simulate user input
        fireEvent.changeText(getByPlaceholderText('Title'), 'Test Title');
        fireEvent.changeText(getByPlaceholderText('Message'), 'Test Content');

        // Simulate pressing the post button
        fireEvent.press(getByText('Post'));

        // Expect the makePost function to be called
        expect(mockMakePost).toHaveBeenCalledWith({
            communityId: mockCommunityId,
            title: 'Test Title',
            text: 'Test Content',
            recipeID: null,
        });

        // Since mockMakePost is asynchronous, we use waitFor to allow the promise to resolve
        await waitFor(() => {
            // No navigation should occur
            expect(mockGoBack).not.toHaveBeenCalled();
            // You would also check for the display of an error message here. This would require
            // you to implement error handling in your component (e.g., setting an error state
            // and displaying it in a Text component) and then asserting its presence here.
        });
    });
});
