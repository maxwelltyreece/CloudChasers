import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import globalStyles from '../styles/global';
import { Image, View } from 'react-native';
import navbarStyles from '../styles/NavbarStyles';
import CustomIcon from './AddButton';

import Dashboard from '../screens/Dashboard/Dashboard';
import Stats from '../screens/Stats/Stats';
import Settings from '../screens/Settings/Settings';
import Groups from '../screens/Groups/Groups';
import DataEntry from '../screens/DataEntry/DataEntry';

const Tab = createBottomTabNavigator();
const renderIcon = (name) => ({ color, size }) => (
    <FontAwesome5 name={name} color={color} size={size} solid />
);

export default function MainTabNavigator() {
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
                <Tab.Screen 
                    name="Home" 
                    component={Dashboard} 
                    options={{
                        tabBarIcon: renderIcon("home"),
                    }}
                />
                <Tab.Screen 
                    name="Groups" 
                    component={Groups} 
                    options={{
                        tabBarIcon: renderIcon("users"),
                    }}
                />
                <Tab.Screen 
                // TODO - Change the PNG to an SVG
                    name="+" 
                    component={DataEntry}
                    options={{
                        tabBarIcon: ({ size }) => (
                            <CustomIcon width={70} height={70} />
                        ),
                        tabBarLabel: () => null,
                    }}
                />
                <Tab.Screen 
                    name="Stats" 
                    component={Stats} 
                    options={{
                        tabBarIcon: renderIcon("chart-pie"),
                    }}
                />
                <Tab.Screen 
                    name="You" 
                    component={Settings} 
                    options={{
                        tabBarIcon: renderIcon("user"),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}