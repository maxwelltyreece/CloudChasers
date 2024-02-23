// React Imports
import React, { useState } from 'react';
import {
	View, Text, StyleSheet, Modal, Pressable, FlatList,
} from 'react-native';

function GoalProgressBar({ current }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedGoal, setSelectedGoal] = useState({
		id: 0,
		description: '160g Protein',
		frequency: 'per day',
	});

	// Mock database of dietary goals
	const goals = [
		{ id: 1, description: '2000ml Water', frequency: 'per day' },
		{ id: 2, description: '150g Protein', frequency: 'per day' },
		{ id: 3, description: '80g Carbohydrates', frequency: 'per day' },
		{ id: 4, description: '1000mg Sodium', frequency: 'per day' },
		{ id: 5, description: '75g Fat', frequency: 'per day' },
	];

	const progressPercent = Math.min((current / selectedGoal.id) * 100, 100); // This calculation might need to be adjusted based on real data

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

			<Text style={styles.currentProgressBarText}>
				{current}
    /
				{selectedGoal.description}
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

const styles = StyleSheet.create({
	// -------Goal Progress Bar-------//
	progressBarComponentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: '#EC6641',
		padding: 20,
		marginBottom: 50,
		borderRadius: 15,
		width: '95%',
		height: 'auto',
		marginTop: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		borderRadius: 15,

	},
	topSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginTop: 4,
		width: '60%',
	},
	goalInfoSection: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		width: '100%',
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
	goalItem: {
		backgroundColor: '#EC6641',
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

export default GoalProgressBar;
