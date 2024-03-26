import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * Modal component for adding a new food entry.
 * @param {Object} props - Component props.
 * @param {boolean} props.isVisible - Flag indicating whether the modal is visible.
 * @param {function} props.onBackdropPress - Function to handle backdrop press event.
 * @param {function} props.toggleModal - Function to toggle modal visibility.
 * @returns {JSX.Element} NewFoodModal component.
 */
const NewFoodModal = ({ isVisible, onBackdropPress, toggleModal }) => {

	/**
     * Component for rendering a food input field.
     * @param {Object} props - Component props.
     * @param {string} props.label - Label for the input field.
     * @param {string} props.value - Value of the input field.
     * @param {function} props.onChangeText - Function to handle text change event.
     * @returns {JSX.Element} FoodInput component.
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
				/>
			</View>
		);
	};

	FoodInput.propTypes = {
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		onChangeText: PropTypes.func.isRequired,
	};

	const [foodItem, setFoodItem] = useState('');
	const [calories, setCalories] = useState('');
	const [protein, setProtein] = useState('');
	const [sugar, setSugar] = useState('');
	const [fat, setFat] = useState('');
	const [carbs, setCarbs] = useState('');
	const [sodium, setSodium] = useState('');

	/**
     * Handles logging of food entry.
     */
	const handleLogFood = () => {
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
				<Text style={styles.label}>Food Item:</Text>
				<TextInput
					style={styles.input}
					value={foodItem}
					onChangeText={setFoodItem}
					placeholder="..."
					placeholderTextColor='#c7c7c7'
				/>
			</View>

			<FoodInput label="Calories" value={calories} onChangeText={setCalories} />
			<FoodInput label="Protein (g)" value={protein} onChangeText={setProtein} />
			<FoodInput label="Sugar (g)" value={sugar} onChangeText={setSugar} />
			<FoodInput label="Fat (g)" value={fat} onChangeText={setFat} />
			<FoodInput label="Carbs (g)" value={carbs} onChangeText={setCarbs} />
			<FoodInput label="Sodium (mg)" value={sodium} onChangeText={setSodium} />

			<View style={styles.buttonContainer}>
				<TouchableOpacity style={{ ...styles.button, padding: 8 }} onPress={toggleModal}>
					<FontAwesome5 name='times' color='white' size={27}/>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button} onPress={handleLogFood}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>   

			</View>   
		</Modal>
	);
};

NewFoodModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onBackdropPress: PropTypes.func,
	toggleModal: PropTypes.func.isRequired,
};


export default NewFoodModal;

