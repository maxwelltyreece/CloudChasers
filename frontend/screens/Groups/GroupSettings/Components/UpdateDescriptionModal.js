import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

/**
 * UpdateDescriptionModal component
 * @param {Object} props - The properties passed to the component
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onConfirm - The function to call when the update is confirmed
 * @param {Function} props.onCancel - The function to call when the update is cancelled
 * @param {Function} props.onDescriptionChange - The function to call when the description changes
 * @param {string} props.description - The current description
 * @returns {JSX.Element} The UpdateDescriptionModal component
 */
export default function UpdateDescriptionModal({ visible, onConfirm, onCancel, onDescriptionChange, description }) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onCancel}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={onCancel}
					>
						<Text style={styles.closeButtonText}>X</Text>
					</TouchableOpacity>
					<TextInput
						style={styles.modalText}
						onChangeText={onDescriptionChange}
						value={description}
						placeholder="New description"
						returnKeyType="done"
						blurOnSubmit={true}
						multiline={true}
					/>
					<TouchableOpacity
						style={styles.buttonClose}
						onPress={onConfirm}
					>
						<Text style={styles.textStyle}>Update</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}