import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import globalStyles from '../styles/global';
import { Image, View } from 'react-native';

import Dashboard from '../screens/Dashboard/Dashboard';
import Stats from '../screens/Stats/Stats';
import Settings from '../screens/Settings/Settings';
import Groups from '../screens/Groups/Groups';
import DataEntry from '../screens/DataEntry/DataEntry';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <View style={{ flex: 1, overflow: 'visible' }}>
            <Tab.Navigator 
                initialRouteName="Dashboard"
                screenOptions={{ 
                    headerShown: false,
                    tabBarStyle: { 
                        height: 90,
                        backgroundColor: globalStyles.backgroundColor.backgroundColor,
                        borderTopWidth: 1,
                        borderTopColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    tabBarActiveTintColor: globalStyles.primaryColor.color,
            }}
            >
                <Tab.Screen 
                    name="Home" 
                    component={Dashboard} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Groups" 
                    component={Groups} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="users" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                // TODO - Change the PNG to an SVG
                    name="+" 
                    component={DataEntry}
                    options={{
                        tabBarIcon: ({ size }) => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Image
                                    source={require('../assets/AddButton.png')}
                                    style={{ width: 70, height: 70 }}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                        tabBarLabel: () => null,
                    }}
                />
                <Tab.Screen 
                    name="Stats" 
                    component={Stats} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="chart-pie" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Settings" 
                    component={Settings} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="cog" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}