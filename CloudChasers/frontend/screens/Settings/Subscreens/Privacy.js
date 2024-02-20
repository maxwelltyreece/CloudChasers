import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        paddingBottom: 100,
    },
    text: {
        margin: 10,
    },
});

/**
 * TextSection component.
 * 
 * This component is responsible for rendering a single section of the privacy policy.
 * Each section consists of a title and content.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the section.
 * @param {string} props.content - The content of the section.
 * 
 * @returns {React.Node} A view component containing the title and content of a privacy policy section.
 */
const TextSection = ({ title, content }) => (
    <View>
        <Text style={[globalStyles.bold, styles.text]}>{title}</Text>
        <Text style={[globalStyles.medium, styles.text]}>{content}</Text>
    </View>
);

/**
 * Privacy component.
 * 
 * This component is responsible for rendering the privacy policy of the application.
 * It uses the TextSection component to render individual sections of the policy.
 * 
 * @returns {React.Node} A scrollable view containing the privacy policy of the application.
 */
const Privacy = () => {
    const data = [
        { 
            title: 'Data We Collect', 
            content: "Our app collects the following data:\n\n" +
            "- User provided information: This includes information that users provide when they create an account like username, email address, and password.\n" +
            "- Device and Log information: We collect information about the device such as the hardware model, operating system version, unique device identifiers, and mobile network information.\n" +
            "- Usage information: We collect information about how users use our app, such as the features they use and the time spent on the app.\n"
        },
        { 
            title: 'How We Use Data', 
            content: "We use the data we collect to:\n\n" +
            "- Provide, maintain, and improve our services.\n" +
            "- Develop new services and features.\n" +
            "- Protect our users and our services.\n"
        },
        { 
            title: 'Data Sharing', 
            content: "We do not share personal data with companies, organizations, or individuals outside of our organization unless one of the following circumstances applies:\n\n" +
            "- With user consent: We will share personal data with companies, organizations, or individuals outside of our organization when we have user consent.\n" +
            "- For legal reasons: We will share personal data if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.\n"
        },
        { 
            title: 'Data Security', 
            content: "We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We review our information collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to systems.\n"
        },
        { 
            title: 'Changes to This Privacy Report', 
            content: "Our Privacy Report may change from time to time. We will post any privacy report changes on this page and, if the changes are significant, we will provide a more prominent notice.\n"
        },
        { 
            title: 'Contact Us', 
            content: "If you have any questions or suggestions about our Privacy Report, do not hesitate to contact us."
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {data.map((section, index) => (
                <TextSection key={index} title={section.title} content={section.content} />
            ))}
        </ScrollView>
    );
};

export default Privacy;