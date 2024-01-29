import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import globalStyles from '../styles/global';
import navbarStyles from '../styles/NavbarStyles';
import { useNavigation } from '@react-navigation/native';
import TabBarIcon from './TabBarIcon';

import Dashboard from '../screens/Dashboard/Dashboard';
import Stats from '../screens/Stats/Stats';
import UserProfile from '../screens/UserProfile/UserProfile';
import Groups from '../screens/Groups/Groups';
import DataEntry from '../screens/DataEntry/DataEntry';

const Tab = createBottomTabNavigator();

const screens = [
    { name: 'Home', component: Dashboard, icon: 'home' },
    { name: 'Groups', component: Groups, icon: 'users' },
    { name: '+', component: DataEntry, icon: '+' },
    { name: 'Stats', component: Stats, icon: 'chart-pie' },
    { name: 'You', component: UserProfile, icon: 'user' },
];

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