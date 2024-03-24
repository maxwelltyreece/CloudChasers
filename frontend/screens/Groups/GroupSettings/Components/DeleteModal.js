import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

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