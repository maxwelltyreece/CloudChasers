import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		height: '95%',
		width: '94%',
		left: '1.5%',
	},
	pressableContainer: {
		justifyContent: 'center', 
		alignItems: 'center', 
		alignContent: 'center',
		width: '100%',
	},
	containerTitle: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		paddingTop: 17,
	},
	motivationalMessage: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 14,
		fontWeight: '600',
		marginTop: 2,
		marginBottom: 16,
		textAlign: 'center',
		width: '100%',
	},
	progressText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

const getMotivationalMessage = (percentage) => {
	if (percentage >= 100) return "Incredible!";
	else if (percentage >= 85) return "Almost there, keep pushing!";
	else if (percentage >= 65) return "You're doing great!";
	else if (percentage >= 50) return "Keep it up!";
	else if (percentage >= 30) return "Making good progress!";
	else if (percentage >= 20) return "On your way!";
	else if (percentage >= 10) return "Off to a good start!";
	else return "Let's get started!";
};

const AchievementsFeature = ({ userAwards, allAwards }) => {
	const navigation = useNavigation();
	const screenWidth = Dimensions.get('window').width;
	const ringSize = screenWidth * 0.26;
	const strokeWidth = ringSize * 0.14;

	const completedAchievements = (userAwards && userAwards.length > 0) ? userAwards.length : 0;
	const totalAchievements = (allAwards && allAwards.length > 0) ? allAwards.length : 0;
	const percentage = totalAchievements > 0 ? (completedAchievements / totalAchievements) * 100 : 0;
	const motivationalMessage = getMotivationalMessage(percentage);

	return (
		<View style={styles.container}>
			<Pressable onPress={() => navigation.navigate('User', { screen: 'Awards' })} style={styles.pressableContainer} testID='awards-widget'>
				<Text style={styles.containerTitle}>Awards</Text>
				<AnimatedCircularProgress
					size={ringSize}
					width={strokeWidth}
					fill={percentage}
					tintColor="#FF815E"
					backgroundColor="#F0F0F0"
					padding={10}
					lineCap="round"
					rotation={0}>
					{
						() => (
							<Text style={styles.progressText}>
								{`${completedAchievements} / ${totalAchievements}`}
							</Text>
						)
					}
				</AnimatedCircularProgress>
				<Text style={styles.motivationalMessage}>{motivationalMessage}</Text>
			</Pressable>
		</View>
	);
};

AchievementsFeature.propTypes = {
	userAwards: PropTypes.array.isRequired,
	allAwards: PropTypes.array.isRequired,
};

export default AchievementsFeature;
