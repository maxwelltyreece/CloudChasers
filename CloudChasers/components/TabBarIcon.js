import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomIcon from './AddButton';

export default function TabBarIcon({ name, color, size, animation, onPress, navigation }) {
    if (name === '+') {
        return (
            <Animated.View style={{ transform: [{ scale: animation }] }}>
                <TouchableOpacity 
                    onPress={() => {
                        onPress();
                        navigation.navigate('+'); 
                    }} 
                    activeOpacity={0.7}
                >
                    <CustomIcon width={70} height={70} />
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return <FontAwesome5 name={name} color={color} size={size} solid />;
}