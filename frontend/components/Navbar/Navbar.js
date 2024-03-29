// React related imports
import React, { useState, useCallback } from 'react';
import { View, Animated, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../styles/global';
import styles from './styles';
import TabBarIcon from '../TabBarIcon/TabBarIcon';
import {
	Dashboard, Stats, Groups, FoodEntry,
} from '../../screens';
import UserNavigator from '../../navigation/UserNavigator';

const Tab = createBottomTabNavigator();

/**
 * An array of screen configurations for the bottom tab navigator.
 * Each configuration is an object with `name`, `component`, and `icon` properties.
 */
const screens = [
	{ name: 'Home', component: Dashboard, icon: 'home' },
	{ name: 'Groups', component: Groups, icon: 'users' },
	{ name: '+', component: FoodEntry, icon: '+' },
	{ name: 'Stats', component: Stats, icon: 'chart-pie' },
	{ name: 'You', component: UserNavigator, icon: 'user' },
];

const screenOptions = {
	headerShown: false,
	tabBarStyle: {
		...styles.tabBarStyle,
		backgroundColor: globalStyles.backgroundColor.backgroundColor,
		height: Platform.OS === 'android' ? 70 : 90, // Apply only on Android
		paddingBottom: Platform.OS === 'android' ? 10 : 30, // Apply only on Android
	},
	tabBarInactiveTintColor: globalStyles.secondaryColor.color,
	tabBarActiveTintColor: globalStyles.primaryColor.color,
	tabBarLabelStyle: {
		fontFamily: globalStyles.medium.fontFamily,
		marginBottom: Platform.OS === 'android' ? 0 : 0, // Apply only on Android
	}
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
		<View style={styles.container}>
			<Tab.Navigator
				initialRouteName="Home"
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