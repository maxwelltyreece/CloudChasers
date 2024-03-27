import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * WelcomeBar component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.name - The name of the user
 * @returns {JSX.Element} The WelcomeBar component
 */
function WelcomeBar({ name }) {
    return (
        <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText} numberOfLines={1}>
                Welcome {name ? name : '!'}!
            </Text>
        </View>
    );
}

WelcomeBar.PropTypes = {
    name: PropTypes.string,
};

export default WelcomeBar;