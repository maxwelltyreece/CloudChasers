import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
    welcomeContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 15,
        paddingTop: 20,
        padding: 5,
    },
    welcomeText: {
        fontSize: 32,
        color: '#333',
        left: '4%',
        fontFamily: 'Montserrat_700Bold',
    },
});

function WelcomeBar({ name }) {
    return (
        <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
                Welcome, {name ? name : 'Loading...'}!
            </Text>
        </View>
    );
}

WelcomeBar.propTypes = {
    name: PropTypes.string.isRequired,
};

export default WelcomeBar;