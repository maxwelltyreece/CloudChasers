import React from 'react';
import {
	Text, StyleSheet, ScrollView,
} from 'react-native';
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

function Privacy() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={[globalStyles.bold, styles.text]}>Data We Collect</Text>
			<Text style={[globalStyles.medium, styles.text]}>
				{'Our app collects the following data:\n\n'
            + '- User provided information: This includes information that users provide when they create an account like username, email address, and password.\n'
            + '- Device and Log information: We collect information about the device such as the hardware model, operating system version, unique device identifiers, and mobile network information.\n'
            + '- Usage information: We collect information about how users use our app, such as the features they use and the time spent on the app.\n'}
			</Text>
			<Text style={[globalStyles.bold, styles.text]}>How We Use Data</Text>
			<Text style={[globalStyles.medium, styles.text]}>
				{'We use the data we collect to:\n\n'
            + '- Provide, maintain, and improve our services.\n'
            + '- Develop new services and features.\n'
            + '- Protect our users and our services.\n'}
			</Text>
			<Text style={[globalStyles.bold, styles.text]}>Data Sharing</Text>
			<Text style={[globalStyles.medium, styles.text]}>
				{'We do not share personal data with companies, organizations, or individuals outside of our organization unless one of the following circumstances applies:\n\n'
            + '- With user consent: We will share personal data with companies, organizations, or individuals outside of our organization when we have user consent.\n'
            + '- For legal reasons: We will share personal data if we have a good-faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process, or enforceable governmental request.\n'}
			</Text>
			<Text style={[globalStyles.bold, styles.text]}>Data Security</Text>
			<Text style={[globalStyles.medium, styles.text]}>
				{'We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We review our information collection, storage, and processing practices, including physical security measures, to guard against unauthorized access to systems.\n'}
			</Text>
			<Text style={[globalStyles.bold, styles.text]}>Changes to This Privacy Report</Text>
			<Text style={[globalStyles.medium, styles.text]}>
				{'Our Privacy Report may change from time to time. We will post any privacy report changes on this page and, if the changes are significant, we will provide a more prominent notice.\n'}
			</Text>
			<Text style={[globalStyles.bold, styles.text]}>Contact Us</Text>
			<Text style={[globalStyles.medium, styles.text]}>
				If you have any questions or suggestions about our Privacy Report,
                do not hesitate to contact us.
			</Text>
		</ScrollView>
	);
}

export default Privacy;
