/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
	View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, Modal, TextInput, Pressable, Alert, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scrollViewContainer: {
		width: '100%',
	},
	remindersDescription: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 7,
	},
	reminderInfoTitle: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	reminderInfoText: {
		fontSize: 14,
		marginRight: 10,
	},
	reminderItem: {
		backgroundColor: 'lightblue',
		padding: 15,
		marginVertical: 5,
		borderRadius: 12,
		marginHorizontal: 20,
	},
	remindersDescriptionContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	remindersInfoContainer: {
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	addReminderButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
	},
	addReminderButton: {
		color: '#FFFFFF',
		margin: 20,
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
	modalView: {
		flex: 1,
		height: '50%',
		marginTop: '25%',
		marginBottom: '10%',
		marginHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		paddingTop: '15%',
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
	descriptionInput: {
		height: '7%',
		width: '100%',
		margin: 20,
		marginBottom: 35,
		borderWidth: 1,
		padding: 10,
		borderRadius: 12,
	},
	selectFreqTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		marginTop: 10,
	},
	frequencySelector: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 22,
		width: '100%',
	},
	frequencyOption: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: '#007aff',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 5,
	},
	frequencyOptionSelected: {
		backgroundColor: '#007aff',
	},
	frequencyTextSelected: {
		color: 'white',
	},
	selectTimeTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	currentTimeSelectedText: {
		fontSize: 22,
		fontWeight: '600',
		marginVertical: 10,
	},
	timePickerSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		marginBottom: 35,
		width: '100%',
		marginTop: 10,
	},
	timePickerButton: {
		backgroundColor: '#F0F0F0',
		marginVertical: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 15,
		overflow: 'hidden',
		alignSelf: 'center',
	},
	timePickerButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	actionButtonsSection: {
		// flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
		margin: 25,
	},
	cancelButton: {
		marginTop: 20,
		marginHorizontal: 10,
		width: '32%',
		backgroundColor: 'white',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		// overflow: 'hidden',
		alignSelf: 'center',
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
	addButton: {
		marginTop: 20,
		marginHorizontal: 10,
		width: '40%',
		backgroundColor: '#FF815E',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		// overflow: 'hidden',
		alignSelf: 'center',
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
	cancelButtonText: {
		fontSize: 15,
		color: 'red',
		alignSelf: 'center',
	},
	addButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center',
		// color: 'white',
	},
	reminderActionButtonsSection: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: 10,
	},
	editButton: {
		padding: 10,
		right: '20%',
		width: '14%',
		height: 'auto',
		backgroundColor: 'lightgreen',
		borderRadius: 5,
		marginHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	deleteButton: {
		padding: 5,
		right: '20%',
		width: '16%',
		height: 'auto',
		backgroundColor: 'tomato',
		borderRadius: 5,
		marginHorizontal: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionButtonText: {
		fontSize: 14,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

const frequencyOptions = ['Daily', 'Weekly']; // Options for the segmented control

const REMINDERS_KEY = 'REMINDERS';

/**
 * Reminders is a screen component designed for displaying and managing the users created reminders.
 *
 * @returns {React.Element} The rendered Reminders screen.
 */
function Reminders() {
	const [reminders, setReminders] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newReminder, setNewReminder] = useState({
		id: null,
		description: '',
		time: '',
		date: '',
		frequency: 'Daily', // Default frequency
	});
	const [date, setDate] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [selectedFrequencyIndex, setSelectedFrequencyIndex] = useState(0);

	useEffect(() => {
		const loadReminders = async () => {
			try {
				const storedReminders = await AsyncStorage.getItem(REMINDERS_KEY);
				if (storedReminders) setReminders(JSON.parse(storedReminders));
			} catch (error) {
				Alert.alert('Error', 'Failed to load the reminders.');
			}
		};

		loadReminders();
	}, []);

	useEffect(() => {
		const saveReminders = async () => {
			try {
				await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
			} catch (error) {
				Alert.alert('Error', 'Failed to save the reminders.');
			}
		};

		saveReminders();
	}, [reminders]);

	const handleAddReminder = () => {
		if (!newReminder.description.trim() || !newReminder.time) {
			Alert.alert('Missing Information', 'You cannot add a reminder without a description and a time.');
			return;
		}

		const updatedReminders = newReminder.id
			? reminders.map((reminder) => (reminder.id === newReminder.id ? newReminder : reminder))
			: [...reminders, { ...newReminder, id: Date.now() }]; // Use Date.now() for a unique id

		setReminders(updatedReminders);
		setIsModalVisible(false);
		setNewReminder({
			id: null, description: '', time: '', date: '', frequency: 'Daily',
		});
		setShowTimePicker(false);
	};

	const deleteReminder = (id) => {
		const filteredReminders = reminders.filter((reminder) => reminder.id !== id);
		setReminders(filteredReminders);
	};

	const editReminder = (id) => {
		const reminderToEdit = reminders.find((reminder) => reminder.id === id);
		if (reminderToEdit) {
			setNewReminder(reminderToEdit);
			setIsModalVisible(true);
			setDate(new Date()); // Reset or adjust date if necessary
		}
	};

	const onChangeTime = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowTimePicker(false); // Close the time picker after selection
		setDate(currentDate);

		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${hours < 12 ? 'AM' : 'PM'}`;
		setNewReminder({ ...newReminder, time: formattedTime });
	};

	const handleFrequencyChange = (index) => {
		setSelectedFrequencyIndex(index);
		const selectedFrequency = frequencyOptions[index];
		setNewReminder({ ...newReminder, frequency: selectedFrequency });
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollViewContainer}>
				{reminders.map((reminder) => (
					<View key={reminder.id} style={styles.reminderItem}>
						<Text style={styles.remindersDescription}>{reminder.description}</Text>
						<Text style={styles.reminderInfoText}>
							<Text style={styles.reminderInfoTitle}>Time:</Text>
							{' '}
							{reminder.time}
						</Text>
						<Text style={styles.reminderInfoText}>
							<Text style={styles.reminderInfoTitle}>Frequency:</Text>
							{' '}
							{reminder.frequency}
						</Text>
						<View style={styles.reminderActionButtonsSection}>
							<Pressable onPress={() => editReminder(reminder.id)} style={styles.editButton}>
								<Text style={styles.actionButtonText}>Edit</Text>
							</Pressable>
							<Pressable onPress={() => deleteReminder(reminder.id)} style={styles.deleteButton}>
								<Text style={styles.actionButtonText}>Delete</Text>
							</Pressable>
						</View>
					</View>

				))}
			</ScrollView>

			<Pressable style={styles.addReminderButton} onPress={() => setIsModalVisible(true)}>
				<Text style={styles.addReminderButtonText}>
						Add Reminder
				</Text>
			</Pressable>

			<Modal
				animationType="slide"
				transparent
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1 }}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50} // Adjust based on your layout and platform
				>
					<ScrollView>
						<View style={styles.modalView}>
							<TextInput
								style={styles.descriptionInput}
								placeholder="Description"
								onChangeText={(text) => setNewReminder({ ...newReminder, description: text })}
								value={newReminder.description}
							/>

							<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Time Selected:</Text>
							<Text style={styles.currentTimeSelectedText}>{newReminder.time || '(Choose Time)'}</Text>

							<Pressable onPress={() => setShowTimePicker(true)} style={styles.timePickerButton}>
								<Text style={styles.timePickerButtonText}>Select Time</Text>
							</Pressable>

							<View style={styles.timePickerSection}>
								{showTimePicker && (
									<DateTimePicker
										value={date}
										mode="time"
										display="default"
										onChange={onChangeTime}
										is24Hour={false}
									/>
								)}
							</View>

							<Text style={styles.selectFreqTitle}>Select Frequency: </Text>

							<View style={styles.frequencySelector}>
								{frequencyOptions.map((option, index) => (
									<Pressable
										key={option}
										style={[
											styles.frequencyOption,
											selectedFrequencyIndex === index ? styles.frequencyOptionSelected : {},
										]}
										onPress={() => handleFrequencyChange(index)}
									>
										<Text style={selectedFrequencyIndex === index ? styles.frequencyTextSelected : {}}>
											{option}
										</Text>
									</Pressable>
								))}
							</View>

							<View style={styles.actionButtonsSection}>
								<Pressable style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
									{({ pressed }) => (
										<Text style={[styles.cancelButtonText, pressed ? styles.pressedText : {}]}>
											Cancel
										</Text>
									)}
								</Pressable>
								<Pressable style={styles.addButton} onPress={handleAddReminder}>
									{({ pressed }) => (
										<Text style={[styles.addButtonText, pressed ? styles.pressedText : {}]}>
											Add
										</Text>
									)}
								</Pressable>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Modal>
		</View>
	);
}

export default Reminders;
