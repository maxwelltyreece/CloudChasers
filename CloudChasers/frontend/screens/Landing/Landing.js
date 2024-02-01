import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Landing = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button 
                title="Login" 
                onPress={() => navigation.navigate('Login')}
            />
            <Button 
                title="Register" 
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Landing;