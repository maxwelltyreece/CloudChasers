/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, act, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from '../../../screens/Dashboard/Dashboard';

// Mock the contexts
jest.mock('../../../contexts/UserContext', () => ({
	useUser: () => ({
		userDetails: { forename: 'Test' },
		updateUserDetails: jest.fn()
	}),
}));


jest.mock('../../../contexts/CommunityContext', () => ({
	useCommunity: () => ({
		userCommunities: [
			{ "description": "Pasta Lovers", "id": "1", "name": "All we talk about is pasta, we love it." },
		],
		getCommunityPosts: jest.fn().mockImplementation(() => Promise.resolve({
			data: {
				posts: [],
			}
		})),
		getUserCommunities: jest.fn()
	}),
}));

jest.mock('../../../contexts/StatsContext', () => ({
	useStats: () => ({
		todayStats: { calories: 100, water: 200, fat: 0, protein: 0, carbs: 0, sodium: 0, fibre: 0, sugar: 0 },
		streak: 3,
		updateTodayStats: jest.fn()
	}),
}));


jest.mock('../../../contexts/GoalsContext', () => ({
	useGoals: () => ({
		goals: {
			"goals": [
				{ "__v": 0, "_id": "1", "maxTargetMass": 2300, "measurement": "sodium", "minTargetMass": 0, "name": "Daily sodium" },
				{ "__v": 0, "_id": "2", "maxTargetMass": 50, "measurement": "sugar", "minTargetMass": 0, "name": "Daily sugar" },
				{ "__v": 0, "_id": "3", "maxTargetMass": 2000, "measurement": "calories", "minTargetMass": 0, "name": "Daily calories" },
				{ "__v": 0, "_id": "4", "maxTargetMass": 2000, "measurement": "water", "minTargetMass": 0, "name": "Daily water" },
				{ "__v": 0, "_id": "5", "maxTargetMass": 275, "measurement": "carbs", "minTargetMass": 0, "name": "Daily carbs" },
				{ "__v": 0, "_id": "6", "maxTargetMass": 1000, "measurement": "fat", "minTargetMass": 0, "name": "Daily fat" },
				{ "__v": 0, "_id": "7", "maxTargetMass": 50, "measurement": "protein", "minTargetMass": 0, "name": "Daily protein" },
				{ "__v": 0, "_id": "8", "maxTargetMass": 28, "measurement": "fibre", "minTargetMass": 0, "name": "Daily fibre" }
			]
		},
		fetchGoals: jest.fn()
	}),
}));

jest.mock('../../../contexts/FoodLogContext', () => ({
	useFoodLog: () => ({
		latestLoggedFood: {
			"latestUserDayMeal": { "__v": 0, "_id": "1", "name": "dinner", "order": 1, "userDayID": "1" },
			"macros": { "calories": 180, "carbs": 80, "fat": 22, "protein": 2 },
			"mealItems": [
				{ "__v": 0, "_id": "1", "foodItemID": "65fb81f5d491cf47026613d6", "name": "Toast", "userDayMealID": "1" },
				{ "__v": 0, "_id": "2", "foodItemID": "65fc2621de274854922cc794", "name": "Jam", "userDayMealID": "2" },
			]
		},
		getLatestLoggedFood: jest.fn()
	}),
}));

jest.mock('../../../contexts/AwardsContext', () => ({
	useAwards: () => ({
		userAwards: [
			{ "__v": 0, "_id": "2", "description": "Log in 5 days in a row", "name": "5 Day Streak" },
			{ "__v": 0, "_id": "4", "description": "Join a community to win this award", "name": "Join Community" },
		],
		awards: [
			{ "__v": 0, "_id": "1", "description": "Log in 10 days in a row", "name": "10 Day Streak" },
			{ "__v": 0, "_id": "2", "description": "Log in 5 days in a row", "name": "5 Day Streak" },
			{ "__v": 0, "_id": "3", "description": "Log in 25 days in a row", "name": "25 Day Streak" },
			{ "__v": 0, "_id": "4", "description": "Join a community to win this award", "name": "Join Community" },
			{ "__v": 0, "_id": "5", "description": "Make a post to win this award", "name": "Make a Post" },
			{ "__v": 0, "_id": "6", "description": "Make 5 posts to win this award", "name": "Make 5 Posts" },
			{ "__v": 0, "_id": "7", "description": "Make 10 posts to win this award", "name": "Make 10 Posts" }
		],
		fetchUserAwards: jest.fn(),
		fetchAwards: jest.fn(),
		fetchAwardsToBeIssued: jest.fn()
	}),
}));

jest.mock('../../../contexts/RemindersContext', () => ({
	useReminders: () => ({
		reminders: [
			{ "date": "", "description": "Healthy breakfast", "frequency": "Daily", "id": 1710507305554, "time": "8:00 AM" },
			{ "date": "", "description": "Drink more water", "frequency": "Daily", "id": 1710507281041, "time": "12:55 PM" },
			{ "date": "", "description": "Go for a run", "frequency": "Weekly", "id": 1710868152530, "time": "5:11 PM" },
			{ "date": "", "description": "Eat less sugar", "frequency": "Weekly", "id": 1710610775331, "time": "9:41 AM" }
		],
	}),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

// Mock navigation
const Stack = createStackNavigator();


// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => {

	const navigate = jest.fn();

	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			navigate,
		}),
	};
});


describe('Filled Dashboard', () => {

	it('renders correctly with filled data', async () => {

		const { getByText } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await act(async () => {
			await waitFor(() => expect(getByText('Welcome Test!')).toBeTruthy());
			await waitFor(() => expect(getByText('Today')).toBeTruthy());
			await waitFor(() => expect(getByText('Calories')).toBeTruthy());
			await waitFor(() => expect(getByText('100 / 2000 kcal')).toBeTruthy());
			await waitFor(() => expect(getByText('Water')).toBeTruthy());
			await waitFor(() => expect(getByText('200 / 2000 ml')).toBeTruthy());
			await waitFor(() => expect(getByText('Reminders')).toBeTruthy());
			await waitFor(() => expect(getByText('Healthy breakfast')).toBeTruthy());
			await waitFor(() => expect(getByText('Drink more water')).toBeTruthy());
			await waitFor(() => expect(getByText('Go for a run')).toBeTruthy());
			await waitFor(() => expect(getByText('Eat less sugar')).toBeTruthy());
			await waitFor(() => expect(getByText('Communities')).toBeTruthy());
			await waitFor(() => expect(getByText('Pasta Lovers')).toBeTruthy());
			await waitFor(() => expect(getByText('All we talk about is pasta, we love it.')).toBeTruthy());
			await waitFor(() => expect(getByText('Posts: 0')).toBeTruthy());
			await waitFor(() => expect(getByText('Awards')).toBeTruthy());
			await waitFor(() => expect(getByText('2 / 7')).toBeTruthy());
			await waitFor(() => expect(getByText("On your way!")).toBeTruthy());
			await waitFor(() => expect(getByText('3')).toBeTruthy());
			await waitFor(() => expect(getByText('Last Log:')).toBeTruthy());
			await waitFor(() => expect(getByText('Dinner')).toBeTruthy());
			await waitFor(() => expect(getByText('180 kcal')).toBeTruthy());
		});
	});

	it('shows loading indicator while fetching data', async () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		);
		await act(async () => {
			await waitFor(() => {
				expect(getByTestId('loading-indicator')).toBeTruthy();
			});
		});
	});

	it('hides loading indicator after data is fetched', async () => {
		AsyncStorage.getItem.mockResolvedValue('mocked-token');

		const { queryByTestId } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await act(async () => {
			await waitFor(() => {
				expect(queryByTestId('loading-indicator')).toBeNull();
			});
		});
	});

	it('matches the filled dashboard snapshot', async () => {
		const Stack = createStackNavigator();
		const tree = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});


	describe('GoalProgressBar Navigation', () => {
		it('navigates to the Reminders page when "See All Reminders" button is pressed', async () => {
			const { getByTestId } = render(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Dashboard" component={Dashboard} />
					</Stack.Navigator>
				</NavigationContainer>
			);

			let button;
			await act(async () => {
				await waitFor(() => {
					button = getByTestId('see-all-reminders-button');
					expect(button).toBeTruthy();
				});
				fireEvent.press(button);
			});

			expect(useNavigation().navigate).toHaveBeenCalledWith('User', { screen: 'Reminders' });
		});
	});

	describe('Dashboard Community Navigation', () => {
		const community = {
			description: "Pasta Lovers",
			id: "1",
			name: "All we talk about is pasta, we love it."
		};

		it('navigates to the Community page when a community widget is pressed', async () => {
			const { getByText } = render(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Dashboard" component={Dashboard} />
					</Stack.Navigator>
				</NavigationContainer>
			);

			await act(async () => {
				await waitFor(() => {
					const communityWidget = getByText('Pasta Lovers');
					fireEvent.press(communityWidget);
				});
			});

			expect(useNavigation().navigate).toHaveBeenCalledWith('Group', { screen: 'GroupPage', params: { community: community } });
		});

	});

	describe('Dashboard Awards Navigation', () => {
        
		it('navigates to the Awards page when "See All Awards" button is pressed', async () => {
			const { getByTestId } = render(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Dashboard" component={Dashboard} />
					</Stack.Navigator>
				</NavigationContainer>
			);

			let button;
			await act(async () => {
				await waitFor(() => {
					button = getByTestId('awards-widget');
					expect(button).toBeTruthy();
				});
				fireEvent.press(button);
			});

			expect(useNavigation().navigate).toHaveBeenCalledWith('User', { screen: 'Awards' });
		});
	});


	describe('Dashboard if user is not logged in', () => {

		beforeEach(() => {
			jest.clearAllMocks();
			AsyncStorage.getItem.mockResolvedValue(null);
		});

		it('should check user login status and redirect to Login if not logged in', async () => {
			AsyncStorage.getItem.mockResolvedValue(null);

			render(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Dashboard" component={Dashboard} />
					</Stack.Navigator>
				</NavigationContainer>
			);

			await act(async () => {
				await waitFor(() => {
					expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
					expect(useNavigation().navigate).toHaveBeenCalledWith('Login');
				});
			});
		});

	});


});