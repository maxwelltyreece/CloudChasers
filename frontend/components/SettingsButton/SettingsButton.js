import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';

/**
 * SettingsButton is a component that renders a button with a settings icon.
 * When pressed, it navigates to the 'Settings' screen.
 *
 * @returns {React.Element} The rendered button.
 */
export default function SettingsButton() {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={() => navigation.navigate('Settings')}
			testID='settings-button'
		>
			<FontAwesome5 name="cog" size={24} color="#FFFFFF" solid />
		</TouchableOpacity>
	);
}
