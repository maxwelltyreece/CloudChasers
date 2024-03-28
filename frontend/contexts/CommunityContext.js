import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import * as communityService from "../services/CommunityService";
import PropTypes from "prop-types";

const CommunityContext = createContext();

export function CommunityProvider({ children }) {
  const [userCommunities, setUserCommunities] = useState([]);

  /**
   * Fetches the communities associated with the current user and updates the state.
   */
  const getUserCommunities = async () => {
    const communities = await communityService.getUserCommunities();
    setUserCommunities(communities.data);
  };

  useEffect(() => {
    getUserCommunities();
  }, []);

  /**
   * Retrieves the list of communities available for the user to join, excluding those already joined.
   * @returns {Promise<Array>} The filtered list of available communities.
   */
  const getAvailableCommunities = async () => {
    const response = await getAllCommunities();
    if (response.success) {
      return response.data.filter(
        (community) =>
          !userCommunities.some(
            (userCommunity) => userCommunity.id === community.id
          )
      );
    } else {
      console.error("Failed to get communities:", response);
      return [];
    }
  };
  /**
   * Fetches details for a specific community by its ID.
   * @param {number} communityId - The ID of the community.
   * @returns {Promise<Object>} The community details.
   */
  const getCommunityDetails = async (communityId) =>
    communityService.getCommunityDetails(communityId);

  /**
   * Retrieves the members of a given community by the community ID.
   * @param {number} communityId - The ID of the community.
   * @returns {Promise<Array>} The list of community members.
   */
  const getCommunityMembers = async (communityId) =>
    communityService.getCommunityMembers(communityId);

  /**
   * Gets the role of the current user within a specific community.
   * @param {number} communityId - The ID of the community.
   * @returns {Promise<string>} The user's role in the community.
   */
  const getUserRole = async (communityId) => {
    const response = await communityService.getUserRole(communityId);
    return response.data.role;
  };

  /**
   * Fetches all communities.
   * @returns {Promise<Array>} The list of all communities.
   */
  const getAllCommunities = async () => communityService.getAllCommunities();

  /**
   * Creates a new community with the given data.
   * @param {Object} communityData - The data for creating a new community.
   * @returns {Promise<Object>} The response object from the create operation.
   */
  const createCommunity = async (communityData) => {
    return communityService.createCommunity(communityData);
  };

  /**
   * Resets the list of communities associated with the user to an empty array.
   */
  const resetUserCommunities = () => {
    setUserCommunities([]);
  };

  /**
   * Joins the community with the given ID.
   * @param {number} communityId - The ID of the community to join.
   * @returns {Promise<Object>} The response object from the join operation.
   */
  const joinCommunity = async (communityId) => {
    try {
      const response = await communityService.joinCommunity(communityId);
      return response;
    } catch (error) {
      console.error("Error joining community:", error);
      throw error;
    }
  };

  /**
   * Deletes the community with the given ID.
   * @param {number} communityId - The ID of the community to delete.
   * @param {Object} navigation - The navigation object to redirect after deletion.
   */
  const deleteCommunity = async (communityId, navigation) => {
    const response = await communityService.deleteCommunity(communityId);
    if (response && response.success) {
      getUserCommunities();
      navigation.navigate("Groups");
    } else {
      console.error("Failed to delete community:", response);
    }
  };

  /**
   * Leaves the community with the given ID.
   * @param {number} communityId - The ID of the community to leave.
   * @param {Object} navigation - The navigation object to redirect after leaving.
   */
  const leaveCommunity = async (communityId, navigation) => {
    const response = await communityService.leaveCommunity(communityId);
    if (response && response.success) {
      getUserCommunities();
      navigation.navigate("Groups");
    } else {
      console.error("Failed to leave community:", response);
      // Handle error
    }
  };

  /**
   * Updates the description of the community with the given ID.
   * @param {number} communityId - The ID of the community.
   * @param {string} description - The new description for the community.
   * @returns {Promise<Object>} The response object from the update operation.
   */
  const updateCommunityDesc = async (communityId, description) => {
    const response = await communityService.updateCommunityDesc(
      communityId,
      description
    );
    return response;
  };

  /**
   * Updates the join privacy setting of the community with the given ID.
   * @param {number} communityId - The ID of the community.
   * @param {boolean} joinPrivacy - The new join privacy setting.
   * @returns {Promise<Object>} The response object from the update operation.
   */
  const updateJoinPrivacy = async (communityId, joinPrivacy) => {
    const response = await communityService.updateJoinPrivacy(
      communityId,
      joinPrivacy
    );
    return response;
  };

  /**
   * Fetches the image for a specified community by its ID and specified folder.
   *
   * @async
   * @function getCommunityImage
   * @param {number} Id The ID of the community for which to fetch the image.
   * @param {string} folderName The folder name where the image is stored.
   * @returns {Promise<Object>} The response object containing either the community image data or an error message.
   */
  const getCommunityImage = async (Id, folderName) => {
    try {
      const response = await communityService.getCommunityImage(Id, folderName);
      return response;
    } catch (error) {
      console.error(error);
      return { status: error.message };
    }
  };

  /**
   * Submits a new post to a community.
   *
   * @async
   * @function makePost
   * @param {Object} postData The data for the post to be submitted.
   * @returns {Promise<Object>} The response from the post creation operation.
   */
  const makePost = async (postData) => {
    const response = await communityService.makePost(postData);
    return response;
  };

  /**
   * Retrieves all posts made in a specific community identified by its ID.
   *
   * @async
   * @function getCommunityPosts
   * @param {number} communityId The ID of the community for which to fetch posts.
   * @returns {Promise<Array>} A list of posts from the specified community.
   */
  const getCommunityPosts = async (communityId) => {
    const response = await communityService.getCommunityPosts(communityId);
    return response.data;
  };

  /**
   * Removes a specified member from a community.
   *
   * @async
   * @function removeMember
   * @param {number} communityId The ID of the community from which the member is to be removed.
   * @param {number} memberId The ID of the member to remove.
   * @returns {Promise<Object>} The response from the member removal operation.
   */
  const removeMember = async (communityId, memberId) => {
    const response = await communityService.removeMember(communityId, memberId);
    return response;
  };

  /**
   * Accepts a membership request for a community.
   *
   * @async
   * @function acceptRequest
   * @param {number} requestId The ID of the request to accept.
   * @returns {Promise<Object>} The response from the request acceptance operation.
   */
  const acceptRequest = async (requestId) => {
    const response = await communityService.acceptRequest(requestId);
    return response;
  };

  /**
   * Denies a membership request for a community.
   *
   * @async
   * @function denyRequest
   * @param {number} requestId The ID of the request to deny.
   * @returns {Promise<Object>} The response from the request denial operation.
   */
  const denyRequest = async (requestId) => {
    const response = await communityService.denyRequest(requestId);
    return response;
  };

  /**
   * Fetches pending membership requests for a specified community.
   *
   * @async
   * @function getPendingRequests
   * @param {number} communityId The ID of the community for which to fetch pending requests.
   * @returns {Promise<Array>} A list of pending membership requests for the community.
   */
  const getPendingRequests = async (communityId) => {
    const response = await communityService.getPendingRequests(communityId);
    return response;
  };

  /**
   * Retrieves all recipes associated with a specific community identified by its ID.
   *
   * @async
   * @function getCommunityRecipes
   * @param {number} communityId The ID of the community for which to fetch recipes.
   * @returns {Promise<Array>} A list of recipes from the specified community.
   */
  const getCommunityRecipes = async (communityId) => {
    const response = await communityService.getCommunityRecipes(communityId);
    return response;
  };

  const value = useMemo(
    () => ({
      deleteCommunity,
      leaveCommunity,
      updateCommunityDesc,
      updateJoinPrivacy,
      getCommunityImage,
      getCommunityDetails,
      getCommunityMembers,
      getUserRole,
      userCommunities,
      setUserCommunities,
      getAllCommunities,
      createCommunity,
      joinCommunity,
      getAvailableCommunities,
      resetUserCommunities,
      getUserCommunities,
      makePost,
      getCommunityPosts,
      removeMember,
      acceptRequest,
      denyRequest,
      getPendingRequests,
      getCommunityRecipes,
    }),
    [
      getCommunityRecipes,
      makePost,
      getCommunityPosts,
      removeMember,
      getUserCommunities,
      getCommunityDetails,
      getAvailableCommunities,
      resetUserCommunities,
      userCommunities,
      setUserCommunities,
      getCommunityMembers,
      getUserRole,
      getAllCommunities,
      createCommunity,
      joinCommunity,
      deleteCommunity,
      leaveCommunity,
      updateCommunityDesc,
      updateJoinPrivacy,
      getCommunityImage,
      acceptRequest,
      denyRequest,
      getPendingRequests,
    ]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

export const useCommunity = () => useContext(CommunityContext);

CommunityProvider.PropTypes = {
	children: PropTypes.node.isRequired,
};
