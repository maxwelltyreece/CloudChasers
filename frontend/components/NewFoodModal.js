import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput,  TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import proptypes from 'prop-types';
import { useFoodLog } from '../contexts/FoodLogContext';

const FoodInput =({label, value, onChangeText}) => {
  return(
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

const NewFoodModal = ({ isVisible, onBackdropPress, toggleModal}) => {


  FoodInput.propTypes = {
    label: proptypes.string.isRequired,
    value: proptypes.string.isRequired,
    onChangeText: proptypes.func.isRequired,
  };
  const { logManualMacro }  = useFoodLog();
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');

  const handleLogFood = async () => {
    // Log the food data
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

      <FoodInput label="Calories"  value={calories} onChangeText={setCalories} />
      <FoodInput label="Protein (g)" value={protein} onChangeText={setProtein} />
      <FoodInput label="Fat (g)" value={fat} onChangeText={setFat} />
      <FoodInput label="Carbs (g)" value={carbs} onChangeText={setCarbs} />
      
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

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		paddingHorizontal: 25,
	},
	inputContainer: {
		marginBottom: 20,
		fontFamily: 'Montserrat_600SemiBold',
	},
	label: {
		marginBottom: 5,
		fontFamily: 'Montserrat_700Bold',
		fontSize: 14,
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#FF815E',
		padding: 12,
		borderRadius: 15,
		alignSelf: 'center',
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
	},
	buttonContainer: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',

	},
});

NewFoodModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onBackdropPress: PropTypes.func.isRequired,
	toggleModal: PropTypes.func.isRequired,
};


export default NewFoodModal;

