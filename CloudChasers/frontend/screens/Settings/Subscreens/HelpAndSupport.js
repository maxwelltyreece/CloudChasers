import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flex: 1,
        alignItems: 'center',
    },
    faq: {
        marginTop: 20,
    },
    question: {
        ...globalStyles.bold,
        marginBottom: 10,
    },
    answer: {
        marginBottom: 20,
    },
});

const HelpAndSupport = () => (
    <View style={styles.container}>
        <View style={styles.faq}>
            <Text style={styles.question}>Q: How do I change my notification settings?</Text>
            <Text style={styles.answer}>A: You can change your notification settings from the 'Notifications' section in the settings menu.</Text>
            <Text style={styles.question}>Q: How do I change the app theme?</Text>
            <Text style={styles.answer}>A: You can change the app theme from the 'Display and Sound' section in the settings menu.</Text>
            <Text style={styles.question}>Q: How do I contact support?</Text>
            <Text style={styles.answer}>A: You can contact support by sending an email to support@example.com.</Text>
        </View>
    </View>
);

export default HelpAndSupport;