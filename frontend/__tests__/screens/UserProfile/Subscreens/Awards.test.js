/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Awards from '../../../../screens/UserProfile/Subscreens/Awards/Awards';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { AwardsContextProvider } from '../../../../contexts/AwardsContext';

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual('@react-navigation/native'),
		useFocusEffect: jest.fn(),
	};
});

// Mocking the AwardsContext
jest.mock('../../../../contexts/AwardsContext', () => ({
    useAwards: () => ({
        userAwards: mockUserAwards,
        awards: mockAwards,
        fetchUserAwards: jest.fn(),
        fetchAwards: jest.fn(),
        fetchAwardsToBeIssued: jest.fn(),
    }),
}));


const mockUserAwards = [
	{ "__v": 0, "_id": "2", "description": "Log in 5 days in a row", "name": "5 Day Streak" },
	{ "__v": 0, "_id": "4", "description": "Join a community to win this award", "name": "Join Community" },
];
const mockAwards = [
	{ "__v": 0, "_id": "1", "description": "Log in 10 days in a row", "name": "10 Day Streak" },
	{ "__v": 0, "_id": "2", "description": "Log in 5 days in a row", "name": "5 Day Streak" },
	{ "__v": 0, "_id": "3", "description": "Log in 25 days in a row", "name": "25 Day Streak" },
	{ "__v": 0, "_id": "4", "description": "Join a community to win this award", "name": "Join Community" },
	{ "__v": 0, "_id": "5", "description": "Make a post to win this award", "name": "Make a Post" },
	{ "__v": 0, "_id": "6", "description": "Make 5 posts to win this award", "name": "Make 5 Posts" },
	{ "__v": 0, "_id": "7", "description": "Make 10 posts to win this award", "name": "Make 10 Posts" }
];


describe('Awards Screen', () => {
	const Stack = createStackNavigator();

	const renderComponent = () =>
		render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Awards" component={Awards} />
				</Stack.Navigator>
			</NavigationContainer>
		);

	it('renders correctly', () => {
		const { getByText } = renderComponent();

		expect(getByText('Completed')).toBeTruthy();
		expect(getByText('Not Completed')).toBeTruthy();
	});

	it('matches the awards snapshot', () => {
		const tree = renderComponent().toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('dislays the awards', () => {
		const { getByText } = renderComponent();

		expect(getByText('5 Day Streak')).toBeTruthy();
		expect(getByText('Join Community')).toBeTruthy();
		expect(getByText('10 Day Streak')).toBeTruthy();
		expect(getByText('25 Day Streak')).toBeTruthy();
		expect(getByText('Make a Post')).toBeTruthy();
		expect(getByText('Make 5 Posts')).toBeTruthy();
		expect(getByText('Make 10 Posts')).toBeTruthy();
	});

	// it('displays the awards that have been completed', () => {
	//     const { getByText, queryAllByTestId } = renderComponent();

	//     expect(getByText('5 Day Streak')).toBeTruthy();
	//     expect(getByText('Join Community')).toBeTruthy();
	//     expect(queryAllByTestId('icon-section').length).toBe(7);

	// });
    
});

