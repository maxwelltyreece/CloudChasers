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

        mockGoBack.mockReset();
        mockMakePost.mockReset();
        useCommunity.mockImplementation(() => ({
            makePost: mockMakePost,
        }));
    });

    it('should handle user input and submit a new post', async () => {
        mockMakePost.mockResolvedValue({ success: true });

        const { getByPlaceholderText, getByText } = render(
            <NewPostPage
                navigation={{ goBack: mockGoBack }}
                route={{ params: { communityId: mockCommunityId } }}
            />
        );

        fireEvent.changeText(getByPlaceholderText('Title'), 'Test Title');
        fireEvent.changeText(getByPlaceholderText('Message'), 'Test Content');

        fireEvent.press(getByText('Post'));

        expect(mockMakePost).toHaveBeenCalledWith({
            communityId: mockCommunityId,
            title: 'Test Title',
            text: 'Test Content',
            recipeID: null,
        });
        expect(mockMakePost).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(mockGoBack).toHaveBeenCalledTimes(1);
        });
    });


    it('should display an error if the post creation fails', async () => {
        mockMakePost.mockResolvedValue({ success: false, error: 'Failed to create post' });

        const { getByPlaceholderText, getByText } = render(
            <NewPostPage
                navigation={{ goBack: mockGoBack }}
                route={{ params: { communityId: mockCommunityId } }}
            />
        );

        fireEvent.changeText(getByPlaceholderText('Title'), 'Test Title');
        fireEvent.changeText(getByPlaceholderText('Message'), 'Test Content');

        fireEvent.press(getByText('Post'));

        expect(mockMakePost).toHaveBeenCalledWith({
            communityId: mockCommunityId,
            title: 'Test Title',
            text: 'Test Content',
            recipeID: null,
        });

        await waitFor(() => {

            expect(mockGoBack).not.toHaveBeenCalled();
        });
    });
});
