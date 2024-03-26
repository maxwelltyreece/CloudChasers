import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

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