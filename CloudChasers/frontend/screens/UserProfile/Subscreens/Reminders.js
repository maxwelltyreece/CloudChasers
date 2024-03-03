import React, { useState } from 'react';
import {
	View, Text, ScrollView, StyleSheet, Modal, TextInput, Platform, Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	timePickerSection: {
		flexDirection: 'row',
		justifyContent: 'space-ar',
		alignItems: 'center',
		alignContent: 'center',
		marginBottom: 35,
		width: '100%',
		marginTop: 10,
	},
	timePicker: {
		borderWidth: 1,
		borderColor: 'grey',
		padding: 10,
		marginVertical: 10,
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
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
});

// Initial mock data for demonstration
const initialReminders = [
	{
		id: 1, description: 'Eat more protein', time: '08:00 AM', date: '2024-02-27', frequency: 'Daily',
	},
	{
		id: 2, description: 'Less carbs', time: '07:00 PM', date: '2024-02-27', frequency: 'Daily',
	},
	{
		id: 3, description: 'Drink more water', time: '09:00 AM', date: '2024-02-27', frequency: 'Daily',
	},
	{
		id: 4, description: 'Take vitamins', time: '10:00 AM', date: '2024-02-27', frequency: 'Daily',
	},
	{
		id: 5, description: 'Exercise', time: '06:00 PM', date: '2024-02-27', frequency: 'Daily',
	},
];

const frequencyOptions = ['Daily', 'Weekly']; // Options for the segmented control

/**
 * Reminders is a screen component designed for displaying and managing the users created reminders.
 *
 * @returns {React.Element} The rendered Reminders screen.
 */
function Reminders() {
	const [reminders, setReminders] = useState(initialReminders);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newReminder, setNewReminder] = useState({
		id: null,
		description: '',
		time: '',
		date: '',
		frequency: 'Daily', // Default frequency
	});
	const [date, setDate] = useState(new Date());
	const [, setShowTimePicker] = useState(false);
	const [selectedFrequencyIndex, setSelectedFrequencyIndex] = useState(0);

	const handleAddReminder = () => {
		const newId = reminders.length + 1;
		setReminders([...reminders, { ...newReminder, id: newId }]);
		setIsModalVisible(false); // Close modal
		// Reset the form
		setNewReminder({
			id: null, description: '', time: '', date: '', frequency: 'Daily',
		});
		setShowTimePicker(false);
	};

	const handleFrequencyChange = (index) => {
		setSelectedFrequencyIndex(index);
		setNewReminder({ ...newReminder, frequency: frequencyOptions[index] });
	};

	const onChangeTime = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowTimePicker(Platform.OS === 'ios');
		setDate(currentDate);

		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		// Format the time string in 12-hour format with leading zeros and AM/PM
		const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${hours < 12 ? 'AM' : 'PM'}`;
		setNewReminder({ ...newReminder, time: formattedTime });
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollViewContainer}>
				{reminders.map((reminder) => (
					<View key={reminder.id} style={styles.reminderItem}>
						<Text style={styles.remindersDescription}>{reminder.description}</Text>
						<Text style={styles.reminderInfoText}>
							Time:
							{reminder.time}
						</Text>
						<Text style={styles.reminderInfoText}>
							Frequency:
							{' '}
							{reminder.frequency}
						</Text>
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

				<View style={styles.modalView}>

					<TextInput
						style={styles.descriptionInput}
						placeholder="Description"
						onChangeText={(text) => setNewReminder({ ...newReminder, description: text })}
						value={newReminder.description}
					/>

					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Time Selected:</Text>
					<Text>{newReminder.time || '(Choose Time)'}</Text>

					<View style={styles.timePickerSection}>
						<Text style={styles.selectTimeTitle}>Select Time: </Text>

						{/* {showTimePicker && ( */}
						<DateTimePicker
							value={date}
							mode="time"
							display="default"
							onChange={onChangeTime}
						/>
						{/* )} */}

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
			</Modal>
		</View>
	);
}

export default Reminders;
