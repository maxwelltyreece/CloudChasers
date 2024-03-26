import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';
import proptypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useGoals } from '../../../../contexts/GoalsContext';
import { styles } from './styles';

const defaultMacroGoals = {
	calories: { value: 2000, unit: 'kcal' },
	protein: { value: 50, unit: 'g' },
	carbs: { value: 300, unit: 'g' },
	fat: { value: 70, unit: 'g' },
	fibre: { value: 30, unit: 'g' },
	sugar: { value: 25, unit: 'g' },
	sodium: { value: 2300, unit: 'mg' },
	water: { value: 3700, unit: 'ml' },
};

const nutrientUnits = {
	calories: 'kcal',
	protein: 'g',
	carbs: 'g',
	fat: 'g',
	fibre: 'g',
	sugar: 'g',
	sodium: 'mg',
	water: 'ml',
};

/**
 * GoalItem component
 * @param {Object} props - Component props
 * @param {string} props.nutrient - The nutrient for the goal
 * @param {Object} props.currentGoal - The current goal
 * @param {Function} props.onUpdate - Function to call when the goal is updated
 */
const GoalItem = ({ nutrient, currentGoal, onUpdate }) => {
	const [goalValue, setGoalValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setGoalValue(currentGoal.value.toString());
	}, [currentGoal]);


	const handleUpdate = () => {
		const updatedValue = goalValue.trim() === '' ? '0' : goalValue;
		onUpdate(nutrient, updatedValue);
		setIsEditing(false);
	};

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<View style={styles.listItem}>

			{isEditing ? (
				<>
					<View style={styles.goalSection}>
						<View style={styles.infoSection}>
							<View style={styles.currentGoalInfoSection}>
								<Text style={styles.currentGoalInfoTitle}>{capitalizeFirstLetter(nutrient)}: </Text>
								<TextInput
									style={styles.input}
									onChangeText={setGoalValue}
									value={goalValue}
									keyboardType="numeric"
									placeholder="Goal"
									returnKeyType="done"
									onSubmitEditing={Keyboard.dismiss}
									testID='inputFieldTestId'
								/>
							</View>
						</View>
						<View style={styles.buttonSection}>
							<Pressable style={styles.button} onPress={handleUpdate}>
								<Text style={styles.buttonText}>Update Goal</Text>
							</Pressable>
						</View>
					</View>
				</>
			) : (
				<View style={styles.goalSection}>
					<View style={styles.infoSection}>
						<View style={styles.currentGoalInfoSection}>
							<Text style={styles.currentGoalInfoTitle}>{capitalizeFirstLetter(nutrient)}: </Text>
							<Text style={styles.currentGoalInfoText}>{currentGoal.value} {currentGoal.unit}</Text>
						</View>
					</View>
					<View style={styles.buttonSection}>
						<Pressable style={styles.button} onPress={() => setIsEditing(true)}>
							<Text style={styles.buttonText}>Change Goal</Text>
						</Pressable>
					</View>
				</View>
			)}

		</View>
	);
};

GoalItem.propTypes = {
	nutrient: proptypes.string.isRequired,
	currentGoal: proptypes.object.isRequired,
	onUpdate: proptypes.func.isRequired,
};


/**
 * Goals component
 */
const Goals = () => {
	const { goals, updateGoal, createGoal, fetchGoals } = useGoals();
	const [isGoalsFetched, setIsGoalsFetched] = useState(false);
	const [fetchedGoals, setFetchedGoals] = useState([]);

	/**
   * Fetches goals from the server
   */
	useEffect(() => {
		const fetchData = async () => {
			await fetchGoals();
			if (goals && goals.goals && goals.goals.length > 0) {
				setFetchedGoals(goals.goals);
				setIsGoalsFetched(true);
			} else {
				setIsGoalsFetched(true);
			}
		};

		if (!isGoalsFetched) {
			fetchData();
		}

	}, [fetchGoals, isGoalsFetched, goals.goals]);

	/**
     * Fetches goals from the server when the component is focused
     */
	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				await fetchGoals();
				if (goals && goals.length > 0) {
					setFetchedGoals(goals);
				}
			};

			if (!isGoalsFetched) {
				fetchData();
			}
		}, [fetchGoals, goals])
	);

	/**
     * Updates a goal
     * @param {string} nutrient - The nutrient for the goal
     * @param {string} newMaxValue - The new maximum value for the goal
     */
	const handleUpdateGoal = async (nutrient, newMaxValue) => {

		const goalToUpdate = fetchedGoals.find(goal => goal.measurement === nutrient);

		if (!goalToUpdate) {
			console.error('Goal not found for nutrient:', nutrient);
			return;
		}

		try {
			await updateGoal(goalToUpdate._id, {
				maxTargetMass: newMaxValue,
			});

			const goalIndex = fetchedGoals.findIndex(goal => goal._id === goalToUpdate._id);
            
			if (goalIndex !== -1) {
				const newFetchedGoals = [...fetchedGoals];
				newFetchedGoals[goalIndex] = { ...newFetchedGoals[goalIndex], maxTargetMass: newMaxValue };

				setFetchedGoals(newFetchedGoals);

				await fetchGoals();
			}
		} catch (error) {
			console.error('Error updating goal GOALS:', error);
		}
	};

	/**
     * Initializes the goals
     */
	const handleInitializeGoals = () => {
		Object.entries(defaultMacroGoals).forEach(([nutrient, goal]) => {
			createGoal({
				goalName: `Daily ${nutrient}`,
				measurement: nutrient,
				minTargetMass: 0,
				maxTargetMass: goal.value,
			});
		});
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, marginTop: 20}}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 92 : 0}
		>
			<View style={styles.container}>
				{isGoalsFetched && fetchedGoals.length === 0 && (
					<View style={styles.container}>
						<Pressable style={styles.intialiseButton} onPress={handleInitializeGoals}>
							<Text style={styles.initialiseButtonText}>Initialize Goals to Begin</Text>
						</Pressable>
						<Text style={styles.initialiseInfoText}>(Leave page and enter again after intialising goals)</Text>
					</View>
				)}
				<View style={styles.goalsContainer}>
					{fetchedGoals.map((goal) => (
						<GoalItem
							key={goal._id}
							nutrient={goal.measurement}
							currentGoal={{
								value: goal.maxTargetMass,
								unit: nutrientUnits[goal.measurement] || ' ',
							}}
							onUpdate={handleUpdateGoal}
						/>
					))}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default Goals;