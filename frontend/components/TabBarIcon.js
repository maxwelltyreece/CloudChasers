import React from 'react';
import { TouchableOpacity, Animated, Platform } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import CustomIcon from './AddButton';

/**
 * TabBarIcon is a component that renders an icon for the tab bar.
 * If the icon name is '+', it renders a custom '+' icon with an animation.
 * Otherwise, it renders a FontAwesome5 icon.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the icon.
 * @param {string} props.color - The color of the icon.
 * @param {number} props.size - The size of the icon.
 * @param {Object} props.animation - The animation for the icon.
 * @param {Function} props.onPress - Function to call when the icon is pressed.
 * @param {Object} props.navigation - The navigation object from React Navigation.
 *
 * @returns {React.Element} The rendered component.
 */
export default function TabBarIcon({ name, color, size, animation, onPress, navigation }) {
	if (name === '+') {
		const iconStyle = {
			transform: [{ scale: animation }],
			marginTop: Platform.OS === 'android' ? -10 : 0, // Adjust this value as needed
		};

		return (
			<Animated.View style={iconStyle}>
				<TouchableOpacity 
					onPress={() => {
						onPress();
						navigation.navigate('+'); 
					}} 
					activeOpacity={0.6}
				>
					<CustomIcon width={70} height={70} startAnimation={onPress} animation={animation} />
				</TouchableOpacity>
			</Animated.View>
		);
	}
	return <FontAwesome5 name={name} color={color} size={size} solid testID="fontawesome-icon"/>;
}

/**
 * These are the PropTypes for the TabBarIcon component.
 * They serve as a type checking mechanism for the props the component receives.
*/
TabBarIcon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.number,
	animation: PropTypes.instanceOf(Animated.Value),
	onPress: PropTypes.func,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}),
};
