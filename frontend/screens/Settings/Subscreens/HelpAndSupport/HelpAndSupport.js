import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

/**
 * HelpAndSupport component
 * @returns {JSX.Element} The HelpAndSupport component
 */
function HelpAndSupport() {
    return (
        <View style={styles.container}>
            <View style={styles.faq}>
                <Text style={styles.question}>Q: How do I change my notification settings?</Text>
                <Text style={styles.answer}>
                    A: You can change your notification settings from the &apos;Notifications&apos;
                    section in the settings menu.
                </Text>
                <Text style={styles.question}>Q: How do I contact support?</Text>
                <Text style={styles.answer}>
                    A: You can contact support by sending an email to support@example.com.
                </Text>
            </View>
        </View>
    );
}

export default HelpAndSupport;