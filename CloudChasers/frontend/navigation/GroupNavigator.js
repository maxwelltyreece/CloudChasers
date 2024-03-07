import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NewGroup from '../screens/Groups/NewGroup';
import GroupPage from '../screens/Groups/GroupPage';
import GroupMembers from '../screens/Groups/GroupMembers';
import GroupSettings from '../screens/Groups/GroupSettings';
import JoinGroup from '../screens/Groups/JoinGroup';

const GroupStack = createStackNavigator();

const commonOptions = {
	headerShown: true,
	headerStyle: {
		backgroundColor: '#F0F0F0',
	},
	headerTitleStyle: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 14,
	},
	headerBackImage: () => (
		<View style={{ paddingLeft: 10 }}>
			<Feather name="chevron-left" size={25} color="#6B6868" />
		</View>
	),
	headerBackTitleVisible: false,
};

export default function GroupNavigator() {
	return (
		<GroupStack.Navigator initialRouteName="GroupPage" screenOptions={commonOptions}>
			<GroupStack.Screen name="NewGroup" component={NewGroup} />
			<GroupStack.Screen name="GroupPage" component={GroupPage} />
			<GroupStack.Screen name="GroupMembers" component={GroupMembers} />
			<GroupStack.Screen name="GroupSettings" component={GroupSettings} />
            <GroupStack.Screen name="JoinGroup" component={JoinGroup} />
		</GroupStack.Navigator>
	);
}
