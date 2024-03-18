// React related imports
import React, { useState, useCallback } from 'react';
import { View, Animated } from 'react-native';

// Navigation related imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// Style related imports
import globalStyles from '../styles/global';
import navbarStyles from '../styles/NavbarStyles';

// Component imports
import TabBarIcon from './TabBarIcon';

// Screen imports
import {
	Dashboard, Stats, Groups, DataEntry,
} from '../screens';
import UserNavigator from '../navigation/UserNavigator';

const Tab = createBottomTabNavigator();

/**
 * An array of screen configurations for the bottom tab navigator.
 * Each configuration is an object with `name`, `component`, and `icon` properties.
 */
const screens = [
	{ name: 'Home', component: Dashboard, icon: 'home' },
	{ name: 'Groups', component: Groups, icon: 'users' },
	{ name: '+', component: DataEntry, icon: '+' },
	{ name: 'Stats', component: Stats, icon: 'chart-pie' },
	{ name: 'You', component: UserNavigator, icon: 'user' },
];

const screenOptions = {
	headerShown: false,
	tabBarStyle: {
		...navbarStyles.tabBarStyle,
		backgroundColor: globalStyles.backgroundColor.backgroundColor,
	},
	tabBarInactiveTintColor: globalStyles.secondaryColor.color,
	tabBarActiveTintColor: globalStyles.primaryColor.color,
	tabBarLabelStyle: {
		fontFamily: globalStyles.medium.fontFamily,
	},
};

/**
 * Returns a function that returns null if the name is '+', otherwise undefined meaning it uses
 * the defaultabel (the name of the tab).
 * This is used for the tabBarLabel option in Tab.Screen.
 *
 * @param {string} name - The name of the tab.
 * @returns {function|null} - A function that returns null if the name is '+', otherwise undefined.
 */
const getTabBarLabel = (name) => (name === '+' ? () => null : undefined);

/**
 * MainTabNavigator is a component that renders a bottom tab navigator.
 * It maps over an array of screens and creates a Tab.Screen for each one.
 * If the screen's icon is '+', it applies an animation when the icon is pressed.
 * The '+' tab does not have a label, hence the tabBarLabel is set to null for it.
 *
 * @returns {React.Element} The rendered bottom tab navigator.
 */
export default function MainTabNavigator() {
	const navigation = useNavigation();
	const [animation] = useState(new Animated.Value(1));

	// startAnimation triggers a sequence of animations that first scales up
	// the animation value to 1.1 over 100ms, then scales it back down to 1 over 100ms.
	// This creates a "bounce" effect when the user interacts with the animated element.
	// The function is memoized with useCallback and only updates when the `animation` state changes.
	const startAnimation = useCallback(() => {
		Animated.sequence([
			Animated.timing(animation, {
				toValue: 1.1,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(animation, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start();
	}, [animation]);

	return (
		<View style={navbarStyles.container}>
			<Tab.Navigator
				initialRouteName="Groups"
				screenOptions={screenOptions}
			>
				{screens.map(({ name, component, icon }) => (
					<Tab.Screen
						key={name}
						name={name}
						component={component}
						options={{
							tabBarIcon: (props) => (
								<TabBarIcon
									{...props}
									name={icon}
									animation={animation}
									onPress={startAnimation}
									navigation={navigation}
								/>
							),
							tabBarLabel: getTabBarLabel(name),
						}}
					/>
				))}
			</Tab.Navigator>
		</View>
	);
}
