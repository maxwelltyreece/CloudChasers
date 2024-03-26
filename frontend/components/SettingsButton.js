import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

/**
 * SettingsButton is a component that renders a button with a settings icon.
 * When pressed, it navigates to the 'Settings' screen.
 *
 * @returns {React.Element} The rendered button.
 */

const styles = StyleSheet.create({
	button: {
		width: 50,
		height: 50,
		borderRadius: 25,
		margin: 10,
		position: 'absolute',
		top: 40,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default function SettingsButton() {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={() => navigation.navigate('Settings')}
		>
			<FontAwesome5 name="cog" size={24} color="#FFFFFF" solid />
		</TouchableOpacity>
	);
}
