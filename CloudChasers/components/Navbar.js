import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import globalStyles from '../styles/global';
import navbarStyles from '../styles/NavbarStyles';
import { useNavigation } from '@react-navigation/native';
import TabBarIcon from './TabBarIcon';

import { Dashboard, Stats, UserProfile, Groups, DataEntry } from '../screens';

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
    { name: 'You', component: UserProfile, icon: 'user' },
];

/**
 * MainTabNavigator is a component that renders a bottom tab navigator.
 * It maps over an array of screens and creates a Tab.Screen for each one.
 * If the screen's icon is '+', it applies an animation when the icon is pressed.
 *
 * @returns {React.Element} The rendered bottom tab navigator.
 */

export default function MainTabNavigator() {
    const navigation = useNavigation();
    const [animation] = useState(new Animated.Value(1));

    const startAnimation = () => {
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
    };

    return (
        <View style={navbarStyles.container}>
            <Tab.Navigator 
                initialRouteName="Dashboard"
                screenOptions={{ 
                    headerShown: false,
                    tabBarStyle: { 
                        ...navbarStyles.tabBarStyle,
                        backgroundColor: globalStyles.backgroundColor.backgroundColor,
                    },
                    tabBarInactiveTintColor: globalStyles.secondaryColor.color,
                    tabBarActiveTintColor: globalStyles.primaryColor.color,
                }}
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
                        tabBarLabel: name === '+' ? () => null : undefined,
                    }}
                />
            ))}
            </Tab.Navigator>
        </View>
    );
}