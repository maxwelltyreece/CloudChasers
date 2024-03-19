import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    paddingVertical: 25,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 5,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 14,
  },
  pickerContainer: {
    marginBottom: 20,
    paddingTop: 30,
  },
  picker: {
    height: 200,
    marginBottom: 10,
    borderColor: '#c7c7c7',
    borderWidth: 5,
    borderRadius: 30,
  },
  buttonContainer: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#FF815E',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
});

function WaterEntry() {
  const [waterAmount, setWaterAmount] = useState('0');

  const handleWaterEntry = () => {
    console.log('Water amount entered:', waterAmount);
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.medium, styles.label]}>Enter Amount of Water Drank (in cups):</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={waterAmount}
          onValueChange={(itemValue) => setWaterAmount(itemValue)}
        >
          {[...Array(31)].map((_, index) => (
            <Picker.Item key={index} label={`${index} `} value={index.toString()} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleWaterEntry}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WaterEntry;
