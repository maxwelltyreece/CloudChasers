/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
	View, Text, ScrollView, KeyboardAvoidingView, Modal, 
	TextInput, Pressable, Alert, Platform
} from 'react-native';
import { useReminders } from '../../../../contexts/RemindersContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const frequencyOptions = ['Daily', 'Weekly']; // Options for the segmented control


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
		frequency: 'Daily', // Default frequency
	});
	const [date, setDate] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios'); // iOS will always show, Android controlled by state
	const [selectedFrequencyIndex, setSelectedFrequencyIndex] = useState(0);


	const toggleActionButtonsVisibility = (id) => {
		const updatedReminders = reminders.map((reminder) => 
			reminder.id === id ? { ...reminder, showActions: !reminder.showActions } : reminder
		);
		setReminders(updatedReminders);
	};

	// Function to open the modal and reset the new reminder details
	const openModalAndResetFields = () => {
		setIsModalVisible(true);
		// Resetting newReminder fields to their default values
		setNewReminder({
			id: null,
			description: '',
			time: '',
			date: '',
			frequency: 'Daily',
		});
		setDate(new Date());

		if (Platform.OS === 'android') {
			setShowTimePicker(false);
		}
	};


	useEffect(() => {
		const loadReminders = async () => {
			try {
				const storedReminders = await AsyncStorage.getItem('REMINDERS');
				if (storedReminders) setReminders(JSON.parse(storedReminders));
			} catch (error) {
				// Alert.alert('Error', 'Failed to load the reminders.');
			}
		};

		loadReminders();
	}, []);

	useEffect(() => {
		const saveReminders = async () => {
			try {
				await AsyncStorage.setItem('REMINDERS', JSON.stringify(reminders));
			} catch (error) {
				// Alert.alert('Error', 'Failed to save the reminders.');
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
			setDate(new Date());
		}
	};

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
						<Text style={styles.threeDotsText}>...</Text>
						</Pressable>
						{reminder.showActions && (
						<View style={styles.reminderActionButtonsSection}>
							<Pressable onPress={() => editReminder(reminder.id)} style={styles.editButton}>
								<Text style={styles.actionButtonText}>Edit</Text>
							</Pressable>
							<Pressable onPress={() => deleteReminder(reminder.id)} style={styles.deleteButton}>
								<Text style={styles.actionButtonText}>Delete</Text>
							</Pressable>
							{/* <Pressable onPress={() => toggleActionButtonsVisibility(reminder.id)} style={styles.backButton}>
								<Text style={styles.backButtonText}>Back</Text>
							</Pressable> */}
						</View>
						)}
					</View>
				))}
			</ScrollView>

			{/* <View style={styles.semiCircle}></View> */}

			<Pressable style={styles.addReminderButton} onPress={openModalAndResetFields}>
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
					keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
				>
					<ScrollView>
						<View style={styles.modalView}>
							<TextInput
								style={[styles.descriptionInput]}
								placeholder="Description"
								onChangeText={(text) => setNewReminder({ ...newReminder, description: text })}
								value={newReminder.description}
								blurOnSubmit
								returnKeyType='done'
							/>

							<Text style={{ fontSize: 16, fontWeight: 'bold' }}>Current Time Selected:</Text>

							{(Platform.OS != 'ios' || !newReminder.time) && (
								<Text style={styles.currentTimeSelectedText}>{newReminder.time || '(Choose Time)'}</Text>
								)
							}

							{Platform.OS === 'ios' || showTimePicker ? (
								<DateTimePicker
									value={date}
									mode="time"
									display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
									onChange={onChangeTime}
									is24Hour={false}
								/>
								) : (
								<Pressable onPress={() => setShowTimePicker(true)} style={styles.timePickerButton}>
									<Text style={styles.timePickerButtonText}>Select Time</Text>
								</Pressable>
							)}

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
