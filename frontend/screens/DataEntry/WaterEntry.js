import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../styles/global';
import { styles } from './styles';

function WaterEntry() {
  const [waterAmount, setWaterAmount] = useState('0');

  const handleWaterEntry = () => {
    console.log('Water amount entered:', waterAmount);
  };

  return (
    <View style={styles.container}>
        <View style={styles.semiCircle} />
        <Text style={[globalStyles.medium, styles.label]}>How many cups have you drank?</Text>
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
