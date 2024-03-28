import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { useFoodLog } from '../../../contexts/FoodLogContext';
import { styles } from './styles';

/**
 * A functional component that renders an input field for food data.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChangeText - The function to call when the text in the input field changes.
 * @returns {JSX.Element} The rendered component.
 */
const FoodInput = ({ label, value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={'numeric'}
                placeholder={`...`}
                placeholderTextColor='#c7c7c7'
                returnKeyType='done'
            />
        </View>
    )
}

/**
 * A functional component that renders a modal for inputting new food data.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isVisible - Whether the modal is currently visible.
 * @param {Function} props.onBackdropPress - The function to call when the backdrop of the modal is pressed.
 * @param {Function} props.toggleModal - The function to call to toggle the visibility of the modal.
 * @returns {JSX.Element} The rendered component.
 */
const NewFoodModal = ({ isVisible, onBackdropPress, toggleModal }) => {

    FoodInput.PropTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChangeText: PropTypes.func.isRequired,
    };

    const { logManualMacro } = useFoodLog();
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');

    /**
     * Logs the food data to the context.
     */
    const handleLogFood = async () => {
        if (!foodItem || !calories || !protein || !fat || !carbs) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (isNaN(calories) || isNaN(protein) || isNaN(fat) || isNaN(carbs)) {
            Alert.alert('Error', 'Weight must be valid numbers');
            return;
        }
        if (calories <= 0 || protein <= 0 || fat <= 0 || carbs <= 0) {
            Alert.alert('Error', 'Weight must be more than 0g');
            return;
        }
        if ( protein >= 100 || fat >= 100 || carbs >= 100) {
            Alert.alert('Error', 'Weight must be less than 100g');
            return;
        }
        const data = {
            mealType: foodItem,
            calories: Number(calories),
            protein: Number(protein),
            fat: Number(fat),
            carbs: Number(carbs),
        };

        try {
            await logManualMacro(data);
            console.log('Manual macro logged successfully');
        } catch (error) {
            console.error('Error logging manual macro:', error);
        }

        toggleModal();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            backdropTransitionOutTiming={0}
            animationIn="pulse"
            animationOut="fadeOut"
            backdropColor="rgba(0,0,0,0.5)"
            animationInTiming={300}
            animationOutTiming={200}
            style={styles.modal}
        >
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name of Food:</Text>
                <TextInput
                    style={styles.input}
                    value={foodItem}
                    onChangeText={setFoodItem}
                    placeholder="..."
                    placeholderTextColor='#c7c7c7'
                    returnKeyType='done'
                />
            </View>

            <FoodInput label="Calories" value={calories} onChangeText={setCalories} />
            <FoodInput label="Protein (g)" value={protein} onChangeText={setProtein} />
            <FoodInput label="Fat (g)" value={fat} onChangeText={setFat} />
            <FoodInput label="Carbs (g)" value={carbs} onChangeText={setCarbs} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ ...styles.button, padding: 8 }} onPress={toggleModal}>
                    <FontAwesome5 name='times' color='white' size={27} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogFood}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

NewFoodModal.PropTypes = {
    isVisible: PropTypes.bool.isRequired,
    onBackdropPress: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
};

export default NewFoodModal;