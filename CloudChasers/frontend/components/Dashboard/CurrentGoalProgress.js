// React Imports
import React, { useState } from 'react';
import {
	View, Text, StyleSheet, Modal, Pressable, FlatList,
} from 'react-native';

const styles = StyleSheet.create({
	// -------Goal Progress Bar-------//
	progressBarComponentContainer: {
		justifyContent: 'center',
		alignContent: 'flex-start',
		backgroundColor: '#EC6641',
		// backgroundColor: 'white',
		padding: 20,
		marginBottom: '14%',
		borderRadius: 15,
		width: '95%',
		height: '15%',
		marginTop: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		// borderColor: 'white',
		// borderWidth: 1,
	},
	topSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		alignContent: 'center',
		marginTop: 4,
		width: '60%',
		height: '50%',
	},
	goalInfoSection: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		width: '90%',
	},
	progressBarTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	currentGoalTitle: {
		fontSize: 12,
		fontWeight: '400',
		marginRight: 10,
	},
	selectGoalButton: {
		backgroundColor: '#FF815E',
		marginTop: 5,
		marginRight: 10,
		paddingVertical: 3,
		paddingHorizontal: 8,
		borderRadius: 10,
	},
	selectGoalButtonText: {
		fontSize: 12,
	},
	progressBarContainer: {
		flexDirection: 'row',
		marginTop: 15,
		backgroundColor: '#F0F0F0',
		borderRadius: 32,
		overflow: 'hidden',
	},
	filledProgressBar: {
		backgroundColor: '#25A6EE',
		height: 20,
		borderRadius: 32,
	},
	currentProgressBarText: {
		fontSize: 15,
		fontWeight: 600,
		textAlign: 'left',
		marginTop: 5,
		paddingLeft: 8,
	},
	modalContainer: {
		flex: 1,
		marginVertical: 125,
		marginHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
		borderTopEndRadius: 28,
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	goalListContainer: {
		width: '100%',
	},
	goalItemText: {
		fontSize: 16,
		fontWeight: '600',
	},
	goalItem: {
		// backgroundColor: '#EC6641',
		backgroundColor: 'lightblue',
		padding: 15,
		width: '100%',
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 10,
		marginVertical: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 5,
	},
	modalCloseButtonText: {
		color: '#FFFFFF',
		marginTop: 20,
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		overflow: 'hidden',
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		letterSpacing: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		opacity: 0.9,
	},
});

function GoalProgressBar({ current }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState({
		id: 1,
		description: '2000ml Water',
		frequency: 'per day',
		currentAmount: 1200,
		goalAmount: 2000,
	});

	// Mock database of dietary goals
	const goals = [
		{
			id: 1, description: '2000ml Water', frequency: 'per day', currentAmount: 1200, goalAmount: 2000,
		},
		{
			id: 2, description: '150g Protein', frequency: 'per day', currentAmount: 80, goalAmount: 150,
		},
		{
			id: 3, description: '80g Carbohydrates', frequency: 'per day', currentAmount: 40, goalAmount: 80,
		},
		{
			id: 4, description: '1000mg Sodium', frequency: 'per day', currentAmount: 500, goalAmount: 1000,
		},
		{
			id: 5, description: '75g Fat', frequency: 'per day', currentAmount: 60, goalAmount: 75,
		},
	];

	const progressPercent = Math.min((
		selectedGoal.currentAmount / selectedGoal.goalAmount) * 100, 100);

	const selectGoal = (goal) => {
		setSelectedGoal(goal);
		setModalVisible(false);
	};

	return (
		<View style={styles.progressBarComponentContainer}>
			{/* Title and Goal Info */}
			<View style={styles.topSection}>
				<Text style={styles.progressBarTitle}>Current Progress:</Text>
				<View style={styles.goalInfoSection}>
					<Text style={styles.currentGoalTitle}>
						{selectedGoal.description}
						{' '}
						{selectedGoal.frequency}
					</Text>
					<Pressable style={styles.selectGoalButton} onPress={() => setModalVisible(true)}>
						<Text style={styles.selectGoalButtonText}>Select Other Goal</Text>
					</Pressable>
				</View>
			</View>

			{/* Progress Bar */}
			<View style={styles.progressBarContainer}>
				<View style={[styles.filledProgressBar, { width: `${progressPercent}%` }]} />
			</View>

			{/* Display Current vs. Goal Amount */}
			<Text style={styles.currentProgressBarText}>
				{selectedGoal.currentAmount}
				/
				{selectedGoal.goalAmount}
			</Text>

			<Modal
				animationType="slide"
				transparent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Select a Goal</Text>
					<FlatList
						data={goals}
						renderItem={({ item }) => (
							<Pressable style={styles.goalItem} onPress={() => selectGoal(item)}>
								<Text style={styles.goalItemText}>
									{item.description}
									{' '}
									{item.frequency}
								</Text>
							</Pressable>
						)}
						keyExtractor={(item) => item.id.toString()}
						style={styles.goalListContainer}
					/>
					<Pressable onPress={() => setModalVisible(!modalVisible)}>
						<Text style={styles.modalCloseButtonText}>Close</Text>
					</Pressable>
				</View>
			</Modal>
		</View>
	);
}

export default GoalProgressBar;
