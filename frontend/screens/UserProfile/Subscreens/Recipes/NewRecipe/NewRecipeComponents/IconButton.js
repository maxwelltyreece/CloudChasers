import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const styles = StyleSheet.create({ 
  iconButton: {
    paddingHorizontal: 40,
    borderRadius: 50,
  },
  buttonText: {
    fontFamily: 'Montserrat_700Bold',
  },
});

/**
 * IconButton component.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.iconName - Name of the icon.
 * @param {Function} props.onPress - Function to call when the button is pressed.
 * @param {Object} props.style - Additional styles for the button.
 * @param {string} props.title - Title of the button.
 * 
 * @returns {React.Element} The rendered IconButton component.
 */
const IconButton = ({ iconName, onPress, style, title }) => {
    return (
        <View style={[styles.iconButton, style]}>
            <Pressable 
                onPress={onPress} 
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1, flexDirection: 'row', justifyContent: 'space-between' }
                ]}
            >
                <Feather name={iconName} size={35} color="black" />
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
        </View>
    );
};
export default IconButton;