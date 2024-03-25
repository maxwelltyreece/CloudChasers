import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput,  TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import proptypes from 'prop-types';

const NewFoodModal = ({ isVisible, onBackdropPress, toggleModal}) => {

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
            />
        </View>
    )
  }

  FoodInput.propTypes = {
    label: proptypes.string.isRequired,
    value: proptypes.string.isRequired,
    onChangeText: proptypes.func.isRequired,
  };
  
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [sugar, setSugar] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sodium, setSodium] = useState('');

  const handleLogFood = () => {
    console.log('Food Item:', foodItem);
    console.log('Calories:', calories);
    console.log('Protein:', protein);
    console.log('Sugar:', sugar);
    console.log('Fat:', fat);
    console.log('Carbs:', carbs);
    console.log('Sodium:', sodium);
    
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

      <FoodInput label="Calories"  value={calories} onChangeText={setCalories} />
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
  isVisible: proptypes.bool.isRequired,
  onBackdropPress: proptypes.func,
  toggleModal: proptypes.func.isRequired,
};


export default NewFoodModal;

