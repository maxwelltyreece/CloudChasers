import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

/**
 * DeleteModal component
 * @param {Object} props - The properties passed to the component
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onConfirm - The function to call when the delete is confirmed
 * @param {Function} props.onCancel - The function to call when the delete is cancelled
 * @param {string} props.communityName - The name of the community to delete
 * @returns {JSX.Element} The DeleteModal component
 */
export default function DeleteModal({ visible, onConfirm, onCancel, communityName }) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onCancel}
		>
			<View style={styles.deleteCenteredView}>
				<View style={styles.deleteModalView}>
					<Text style={styles.deleteModalText}>Delete {communityName}?</Text>
					<View style={styles.deleteButtonRow}>
						<TouchableOpacity
							style={styles.deleteButtonClose}
							onPress={onConfirm}
						>
							<Text style={styles.deleteTextStyle}>Delete</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.deleteButtonClose}
							onPress={onCancel}
						>
							<Text style={styles.deleteTextStyle}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}