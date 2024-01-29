import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
        return (
            <Animated.View style={{ transform: [{ scale: animation }] }}>
                <TouchableOpacity 
                    onPress={() => {
                        onPress();
                        navigation.navigate('+'); 
                    }} 
                    activeOpacity={0.6}
                >
                    <CustomIcon width={70} height={70} />
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return <FontAwesome5 name={name} color={color} size={size} solid />;
}