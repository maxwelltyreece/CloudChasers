// React Imports
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	View, Text, StyleSheet, Animated
} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
	// -------Goal Progress Bar-------//
	// progressBarComponentContainer: {
	// 	justifyContent: 'center',
	// 	alignContent: 'flex-start',
	// 	// backgroundColor: '#EC6641',
	// 	backgroundColor: '#FF815E',
	// 	// backgroundColor: 'white',
	// 	padding: 20,
	// 	marginTop: '2%',
	// 	// marginBottom: '14%',
	// 	borderRadius: 15,
	// 	width: '95%',
	// 	height: '15%',
	// 	shadowColor: '#000',
	// 	shadowOffset: { width: 0, height: 1 },
	// 	shadowOpacity: 0.22,
	// 	shadowRadius: 2.22,
	// 	elevation: 3,
	// 	// borderColor: 'white',
	// 	// borderWidth: 1,
	// },
	// topSection: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	alignItems: 'flex-start',
	// 	alignContent: 'center',
	// 	marginTop: 4,
	// 	width: '60%',
	// 	height: '50%',
	// },
	// goalInfoSection: {
	// 	justifyContent: 'center',
	// 	alignItems: 'flex-end',
	// 	width: '90%',
	// },
	// progressBarTitle: {
	// 	fontSize: 20,
	// 	fontWeight: 'bold',
	// },
	// currentGoalTitle: {
	// 	fontSize: 12,
	// 	fontWeight: '500',
	// 	marginRight: 10,
	// },
	// selectGoalButton: {
	// 	// backgroundColor: '#FF815E',
	// 	backgroundColor: '#F0F0F0',
	// 	marginTop: 5,
	// 	marginRight: 10,
	// 	paddingVertical: 3,
	// 	paddingHorizontal: 8,
	// 	borderRadius: 6,
	// },
	// selectGoalButtonText: {
	// 	fontSize: 12,
	// },
	// progressBarContainer: {
	// 	flexDirection: 'row',
	// 	marginTop: 15,
	// 	backgroundColor: '#F0F0F0',
	// 	borderRadius: 32,
	// 	overflow: 'hidden',
	// },
	// filledProgressBar: {
	// 	backgroundColor: '#25A6EE',
	// 	height: 20,
	// 	borderRadius: 32,
	// },
	// currentProgressBarText: {
	// 	fontSize: 15,
	// 	fontWeight: '600',
	// 	textAlign: 'left',
	// 	marginTop: 5,
	// 	paddingLeft: 8,
	// },
	// modalContainer: {
	// 	flex: 1,
	// 	marginVertical: 125,
	// 	marginHorizontal: 20,
	// 	backgroundColor: 'white',
	// 	borderRadius: 20,
	// 	padding: 35,
	// 	alignItems: 'center',
	// 	shadowColor: '#000',
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 2,
	// 	},
	// 	shadowOpacity: 0.5,
	// 	shadowRadius: 4,
	// 	elevation: 5,
	// 	borderTopEndRadius: 28,
	// },
	// modalTitle: {
	// 	fontSize: 22,
	// 	fontWeight: 'bold',
	// 	marginBottom: 12,
	// },
	// goalListContainer: {
	// 	width: '100%',
	// },
	// goalItemText: {
	// 	fontSize: 16,
	// 	fontWeight: '600',
	// },
	// goalItem: {
	// 	// backgroundColor: '#EC6641',
	// 	backgroundColor: 'lightblue',
	// 	padding: 15,
	// 	width: '100%',
	// 	borderWidth: 1,
	// 	borderColor: '#eee',
	// 	borderRadius: 10,
	// 	marginVertical: 10,
	// 	shadowColor: '#000',
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 1,
	// 	},
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 2,
	// 	elevation: 5,
	// },
	// modalCloseButtonText: {
	// 	color: '#FFFFFF',
	// 	marginTop: 20,
	// 	backgroundColor: '#007BFF',
	// 	paddingVertical: 10,
	// 	paddingHorizontal: 20,
	// 	borderRadius: 20,
	// 	overflow: 'hidden',
	// 	alignSelf: 'center',
	// 	textTransform: 'uppercase',
	// 	fontWeight: 'bold',
	// 	letterSpacing: 1,
	// 	shadowColor: '#000',
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 2,
	// 	},
	// 	shadowOpacity: 0.25,
	// 	shadowRadius: 3.84,
	// 	elevation: 5,
	// 	opacity: 0.9,
	// },
	progressBarComponentContainer: {
		// flex: 1,
		justifyContent: 'center',
		// backgroundColor: '#F2F2F2',
		// padding: 15,
		marginTop: '1%',
		// marginBottom: '1%',
		borderRadius: 15,
		width: '100%',
		height: '40%',
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.22,
		// shadowRadius: 2.22,
		// elevation: 3,
		// backgroundColor: 'red',
	},
	progressBarContainer: {
		flexDirection: 'row',
		marginTop: '1%',
		backgroundColor: '#F0F0F0',
		borderRadius: 32,
		overflow: 'hidden',
		width: '100%',
		height: 20,
	},
	filledProgressBar: {
		backgroundColor: '#FF815E',
		height: 20,
		borderRadius: 32,
	},
	progressBarItem: {
		marginBottom: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: '25%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	labelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	swiperContainer: {
		// height: 'auto',
	},
	slideContainer: {
		// flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	firstSlideContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		height: '100%',
		paddingBottom: 10,
	},
	firstLabel: {
		top: 2,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 7,
	},
	calorieProgressBarItem: {
		marginBottom: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: '30%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	waterProgressBarItem: {
		marginTop: 10,
		marginBottom: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: '30%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	slideTitle: {
		fontSize: 19,
		fontWeight: 'bold',
		marginBottom: 10,
		alignSelf: 'center',
	},
});

// ProgressBar component
const ProgressBar = ({ label, progress, max }) => {

	const [containerWidth, setContainerWidth] = useState(0);
	const animatedWidth = useRef(new Animated.Value(0)).current;

	const progressBarStyle = label === 'Calories' ? styles.calorieProgressBarItem
							: label === 'Water' ? styles.waterProgressBarItem
							: styles.progressBarItem; // Default style

	const labelStyle = label === 'Calories' ? styles.firstLabel
					: label === 'Water' ? styles.firstLabel
					: styles.label; // Default style

	// Function to measure the width of the container
	const measureContainer = (event) => {
	const { width } = event.nativeEvent.layout;
	setContainerWidth(width);
	};
	
	useEffect(() => {
		const finalWidth = (progress / max) * containerWidth;
	
		Animated.timing(animatedWidth, {
			toValue: finalWidth,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	}, [progress, max, containerWidth]);

	return (
		<View style={progressBarStyle}>
			<View style={styles.labelContainer}>
			<Text style={labelStyle}>{label}</Text>
			<Text style={labelStyle}>{`${progress} / ${max}`}</Text>
			</View>
			<View style={styles.progressBarContainer} onLayout={measureContainer}>
				<Animated.View style={[styles.filledProgressBar, { width: animatedWidth }]} />
			</View>
		</View>
	);
	
};
	

// Main GoalProgressBar component
function GoalProgressBar({ foodStats }) {
	return (
		<View style={styles.progressBarComponentContainer}>
			<Swiper style={styles.swiperContainer} showsButtons={false} loop={false}>

				<View style={styles.firstSlideContainer}>
					<Text style={styles.slideTitle}>Calories & Water</Text>
					<ProgressBar label="Calories" progress={foodStats.calories} max={100} />
					<ProgressBar label="Water" progress={foodStats.water} max={100} />
				</View>
	
				<View style={styles.slideContainer}>
					<Text style={styles.slideTitle}>Macronutrients</Text>
					<ProgressBar label="Carbs" progress={foodStats.carbs} max={100} />
					<ProgressBar label="Protein" progress={foodStats.protein} max={100} />
					<ProgressBar label="Fat" progress={foodStats.fat} max={100} />
				</View>
	
				<View style={styles.slideContainer}>
					<Text style={styles.slideTitle}>Micronutrients</Text>
					<ProgressBar label="Sugar" progress={foodStats.sugar} max={100} />
					<ProgressBar label="Sodium" progress={foodStats.sodium} max={100} />
					<ProgressBar label="Fiber" progress={foodStats.fiber} max={100} />
				</View>
			</Swiper>
		</View>
	);
}
  
GoalProgressBar.propTypes = {
	foodStats: PropTypes.object.isRequired,
};
  
ProgressBar.propTypes = {
	label: PropTypes.string.isRequired,
	progress: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
};
  
export default GoalProgressBar;

// function GoalProgressBar() {
// 	const [modalVisible, setModalVisible] = useState(false);
// 	const [selectedGoal, setSelectedGoal] = useState({
// 		id: 1,
// 		description: '2000ml Water',
// 		frequency: 'per day',
// 		currentAmount: 1200,
// 		goalAmount: 2000,
// 	});

// 	// Mock database of dietary goals
// 	const goals = [
// 		{
// 			id: 1, description: '2000ml Water', frequency: 'per day', currentAmount: 1200, goalAmount: 2000,
// 		},
// 		{
// 			id: 2, description: '150g Protein', frequency: 'per day', currentAmount: 80, goalAmount: 150,
// 		},
// 		{
// 			id: 3, description: '80g Carbohydrates', frequency: 'per day', currentAmount: 40, goalAmount: 80,
// 		},
// 		{
// 			id: 4, description: '1000mg Sodium', frequency: 'per day', currentAmount: 500, goalAmount: 1000,
// 		},
// 		{
// 			id: 5, description: '75g Fat', frequency: 'per day', currentAmount: 60, goalAmount: 75,
// 		},
// 	];

// 	const progressPercent = Math.min((
// 		selectedGoal.currentAmount / selectedGoal.goalAmount) * 100, 100);

// 	const selectGoal = (goal) => {
// 		setSelectedGoal(goal);
// 		setModalVisible(false);
// 	};

// 	return (
// 		<View style={styles.progressBarComponentContainer}>
// 			{/* Title and Goal Info */}
// 			<View style={styles.topSection}>
// 				<Text style={styles.progressBarTitle}>Current Progress:</Text>
// 				<View style={styles.goalInfoSection}>
// 					<Text style={styles.currentGoalTitle}>
// 						{selectedGoal.description}
// 						{' '}
// 						{selectedGoal.frequency}
// 					</Text>
// 					<Pressable style={styles.selectGoalButton} onPress={() => setModalVisible(true)}>
// 						<Text style={styles.selectGoalButtonText}>Select Other Goal</Text>
// 					</Pressable>
// 				</View>
// 			</View>

// 			{/* Progress Bar */}
// 			<View style={styles.progressBarContainer}>
// 				<View style={[styles.filledProgressBar, { width: `${progressPercent}%` }]} />
// 			</View>

// 			{/* Display Current vs. Goal Amount */}
// 			<Text style={styles.currentProgressBarText}>
// 				{selectedGoal.currentAmount}
// 				/
// 				{selectedGoal.goalAmount}
// 			</Text>

// 			<Modal
// 				animationType="slide"
// 				transparent
// 				visible={modalVisible}
// 				onRequestClose={() => setModalVisible(!modalVisible)}
// 			>
// 				<View style={styles.modalContainer}>
// 					<Text style={styles.modalTitle}>Select a Goal</Text>
// 					<FlatList
// 						data={goals}
// 						renderItem={({ item }) => (
// 							<Pressable style={styles.goalItem} onPress={() => selectGoal(item)}>
// 								<Text style={styles.goalItemText}>
// 									{item.description}
// 									{' '}
// 									{item.frequency}
// 								</Text>
// 							</Pressable>
// 						)}
// 						keyExtractor={(item) => item.id.toString()}
// 						style={styles.goalListContainer}
// 					/>
// 					<Pressable onPress={() => setModalVisible(!modalVisible)}>
// 						<Text style={styles.modalCloseButtonText}>Close</Text>
// 					</Pressable>
// 				</View>
// 			</Modal>
// 		</View>
// 	);
// }

// export default GoalProgressBar;

// // Add prop validation for 'foodStats'
// GoalProgressBar.propTypes = {
// 	foodStats: PropTypes.object.isRequired,
// 	nutrient: PropTypes.string.isRequired,
// };
