import React, { useState, useEffect } from 'react';
import {
	View, Text, ScrollView, KeyboardAvoidingView, Modal, 
	TextInput, Pressable, Alert, Platform
} from 'react-native';
import { useReminders } from '../../../../contexts/RemindersContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const FREQUENCY_OPTIONS = ['Daily', 'Weekly'];
const STORAGE_KEY = 'REMINDERS';

/**
 * Reminders is a screen component designed for displaying and managing the users created reminders.
 *
 * @returns {React.Element} The rendered Reminders screen.
 */
function Reminders() {
	const { reminders, setReminders } = useReminders();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [newReminder, setNewReminder] = useState({
		id: null,
		description: '',
		time: '',
		date: '',
		frequency: FREQUENCY_OPTIONS[0],
	});
	const [date, setDate] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios'); // iOS will always show, Android controlled by state
	const [selectedFrequencyIndex, setSelectedFrequencyIndex] = useState(0);

	/**
     * Toggles the visibility of action buttons for a reminder.
     *
     * @param {number} id - The id of the reminder.
     */
	const toggleActionButtonsVisibility = (id) => {
		const updatedReminders = reminders.map((reminder) => 
			reminder.id === id ? { ...reminder, showActions: !reminder.showActions } : reminder
		);
		setReminders(updatedReminders);
	};
  
	/**
     * Opens the modal and resets the new reminder details.
     */
	const openModalAndResetFields = () => {
		setIsModalVisible(true);
		setNewReminder({
			id: null,
			description: '',
			time: '',
			date: '',
			frequency: FREQUENCY_OPTIONS[0],
		});
		setDate(new Date());

		if (Platform.OS === 'android') {
			setShowTimePicker(false);
		}
	};

	/**
     * Loads reminders from storage.
     */
	useEffect(() => {
		const loadReminders = async () => {
			try {
				const storedReminders = await AsyncStorage.getItem(STORAGE_KEY);
				if (storedReminders) setReminders(JSON.parse(storedReminders));
			} catch (error) {
				Alert.alert('Error', 'Failed to load the reminders.');
			}
		};

		loadReminders();
	}, []);

	/**
     * Saves reminders to storage.
     */
	useEffect(() => {
		const saveReminders = async () => {
			try {
				await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
			} catch (error) {
				Alert.alert('Error', 'Failed to save the reminders.');
			}
		};

		saveReminders();
	}, [reminders]);

	/**
     * Adds a new reminder or updates an existing one.
     */
	const handleAddReminder = () => {
		if (!newReminder.description.trim() || !newReminder.time) {
			Alert.alert('Missing Information', 'You cannot add a reminder without a description and a time.');
			return;
		}

		const updatedReminders = newReminder.id
			? reminders.map((reminder) => (reminder.id === newReminder.id ? newReminder : reminder))
			: [...reminders, { ...newReminder, id: Date.now() }];

		setReminders(updatedReminders);
		setIsModalVisible(false);
		setNewReminder({
			id: null, description: '', time: '', date: '', frequency: FREQUENCY_OPTIONS[0],
		});
		setShowTimePicker(false);
	};

	/**
     * Deletes a reminder.
     *
     * @param {number} id - The id of the reminder to delete.
     */
	const deleteReminder = (id) => {
		const filteredReminders = reminders.filter((reminder) => reminder.id !== id);
		setReminders(filteredReminders);
	};

	/**
     * Edits a reminder.
     *
     * @param {number} id - The id of the reminder to edit.
     */
	const editReminder = (id) => {
		const reminderToEdit = reminders.find((reminder) => reminder.id === id);
		if (reminderToEdit) {
			setNewReminder(reminderToEdit);
			setIsModalVisible(true);
			setDate(new Date());
		}
	};

	/**
     * Handles the change of time.
     *
     * @param {Event} event - The event object.
     * @param {Date} selectedDate - The selected date.
     */
	const onChangeTime = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		if (Platform.OS === 'android') {
			setShowTimePicker(false);
		}
		setDate(currentDate);

		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${hours < 12 ? 'AM' : 'PM'}`;
		setNewReminder({ ...newReminder, time: formattedTime });
	};

	/**
     * Handles the change of frequency.
     *
     * @param {number} index - The index of the selected frequency.
     */
	const handleFrequencyChange = (index) => {
		setSelectedFrequencyIndex(index);
		const selectedFrequency = FREQUENCY_OPTIONS[index];
		setNewReminder({ ...newReminder, frequency: selectedFrequency });
	};

	const IOS = 'ios';
	const DONE = 'done';
	const TIME = 'time';
	const SPINNER = 'spinner';
	const SLIDE = 'slide';
	const HEIGHT = 'height';
	const PADDING = 'padding';
	const BOLD = 'bold';
	const INLINE = 'inline';
	const { description, time } = newReminder;

	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollViewContainer}>
				{reminders.map((reminder) => (
					<View key={reminder.id} style={styles.reminderItem}>
						<Text style={styles.remindersDescription} numberOfLines={4}>{reminder.description}</Text>
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
						<Pressable onPress={() => toggleActionButtonsVisibility(reminder.id)} style={styles.threeDotsButton}>
							<Text style={styles.threeDotsText} testID='three-dots'>...</Text>
						</Pressable>
						{reminder.showActions && (
							<View style={styles.reminderActionButtonsSection}>
								<Pressable onPress={() => editReminder(reminder.id)} style={styles.editButton}>
									<Text style={styles.actionButtonText}>Edit</Text>
								</Pressable>
								<Pressable onPress={() => deleteReminder(reminder.id)} style={styles.deleteButton}>
									<Text style={styles.actionButtonText} testID='delete-reminder'>Delete</Text>
								</Pressable>
							</View>
						)}
					</View>
				))}
			</ScrollView>

			<Pressable style={styles.addReminderButton} onPress={openModalAndResetFields} testID='add-reminder-button'>
				<Text style={styles.addReminderButtonText}>Add Reminder</Text>
			</Pressable>

			<Modal
				animationType={SLIDE}
				transparent
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === IOS ? PADDING : HEIGHT}
					style={{ flex: 1 }}
					keyboardVerticalOffset={Platform.OS === IOS ? 0 : 50}
				>
					<ScrollView>
						<View style={styles.modalView}>
							<TextInput
								style={[styles.descriptionInput]}
								placeholder="Description"
								onChangeText={(text) => setNewReminder({ ...newReminder, description: text })}
								value={description}
								blurOnSubmit
								returnKeyType={DONE}
								testID='description-input'
							/>

							<Text style={{ fontSize: 16, fontWeight: BOLD }}>Current Time Selected:</Text>

							{(Platform.OS != IOS || !time) && (
								<Text style={styles.currentTimeSelectedText}>{time || '(Choose Time)'}</Text>
							)}

							{Platform.OS === IOS || showTimePicker ? (
								<DateTimePicker
									value={date}
									mode={TIME}
									display={Platform.OS === IOS ? INLINE : SPINNER}
									onChange={onChangeTime}
									is24Hour={false}
									testID='time-picker-button'
								/>
							) : (
								<Pressable onPress={() => setShowTimePicker(true)} style={styles.timePickerButton}>
									<Text style={styles.timePickerButtonText}>Select Time</Text>
								</Pressable>
							)}

							<Text style={styles.selectFreqTitle}>Select Frequency: </Text>

							<View style={styles.frequencySelector} testID='frequency-selector'>
								{FREQUENCY_OPTIONS.map((option, index) => (
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
										<Text style={[styles.addButtonText, pressed ? styles.pressedText : {}]} testID='done-button'>
                                            Done
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
