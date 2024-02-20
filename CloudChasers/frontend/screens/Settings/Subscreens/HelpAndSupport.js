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

/**
 * FAQItem component.
 * This component is used to display a single FAQ item, including the question and answer.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.question - The FAQ question.
 * @param {string} props.answer - The FAQ answer.
 * @returns {React.Node} The rendered component.
 */
const FAQItem = ({ question, answer }) => (
    <>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.answer}>{answer}</Text>
    </>
);

const faqs = [
    {
        question: 'Q: How do I change my notification settings?',
        answer: 'A: You can change your notification settings from the \'Notifications\' section in the settings menu.',
    },
    {
        question: 'Q: How do I change the app theme?',
        answer: 'A: You can change the app theme from the \'Display and Sound\' section in the settings menu.',
    },
    {
        question: 'Q: How do I contact support?',
        answer: 'A: You can contact support by sending an email to support@example.com.',
    },
];

/**
 * HelpAndSupport component.
 * This component is used to display a list of FAQ items.
 * The FAQ items are defined in the `faqs` array and each item is rendered using the `FAQItem` component.
 *
 * @returns {React.Node} The rendered component.
 */
const HelpAndSupport = () => (
    <View style={styles.container}>
        <View style={styles.faq}>
            {faqs.map((faq, index) => <FAQItem key={index} {...faq} />)}
        </View>
    </View>
);

export default HelpAndSupport;