/* eslint-disable no-undef */
import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { UserProvider, useUser } from '../../contexts/UserContext';
import { CommunityProvider, useCommunity } from '../../contexts/CommunityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as userService from '../../services/UserService';
import * as communityService from '../../services/CommunityService';

jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
}));

jest.mock('../../services/UserService', () => ({
	fetchUserDetails: jest.fn(),
	editUserDetails: jest.fn(),
}));

jest.mock('../../services/CommunityService', () => ({
	fetchUserCommunities: jest.fn(),
}));

jest.mock('../../contexts/CommunityContext', () => ({
	useCommunity: () => ({
		resetUserCommunities: jest.fn(),
	}),
}));


function UserConsumer() {
	const { userDetails } = useUser();
	return <Text>{userDetails?.username}</Text>;
}

console.log(CommunityProvider, UserProvider);


const TestComponent = () => {
	return (
		<CommunityProvider>
			<UserProvider>
				<UserConsumer />
			</UserProvider>
		</CommunityProvider>
	);
};

describe('UserContext', () => {
	it('provides user details to consuming components', async () => {

		AsyncStorage.getItem.mockResolvedValue('mocked-token');

		userService.fetchUserDetails.mockResolvedValue({
			data: { username: 'JohnDoe', email: 'user@test.com' },
		});

		const { findByText } = render(<TestComponent />);

		await waitFor(() => {
			expect(findByText('JohnDoe')).toBeTruthy();
		});
	});
});






// import React, { useEffect } from 'react';
// import { render, waitFor, act } from '@testing-library/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as userService from '../../services/UserService';
// import { UserProvider, useUser } from '../../contexts/UserContext';
// import { Text } from 'react-native';

// // Mock the services and AsyncStorage
// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
//     setItem: jest.fn(),
//     removeItem: jest.fn(),
// }));

// jest.mock('../../contexts/UserContext');

// jest.mock('../../services/UserService', () => ({
//     fetchUserDetails: jest.fn(),
// }));


// function TestConsumer() {
//     const { userDetails, getUserDetails, logout } = useUser();

//     useEffect(() => {
//         getUserDetails();
//     }, []);

//     return (
//         <>{userDetails && <Text testID="user-details">{userDetails.username}</Text>}</>
//     );
// }

// describe('UserContext', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('provides user details to consuming components', async () => {
//         const userDetails = { username: 'JohnDoe', email: 'john@example.com' };
//         userService.fetchUserDetails.mockResolvedValue({ data: userDetails });
//         AsyncStorage.getItem.mockResolvedValue('mock-token');

//         const { findByTestId } = render(
//             <UserProvider>
//                 <TestConsumer />
//             </UserProvider>
//         );

//         await act(async () => {
//             await waitFor(() => {
//                 const userDetailsElement = findByTestId('user-details');
//                 expect(userDetailsElement.props.children).toBe(userDetails.username);
//             });
//         });

//     });

//     // Add more tests here for updateUserDetails, editUserDetails, and logout
// });

