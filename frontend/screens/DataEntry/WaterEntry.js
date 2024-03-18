import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 200,
    width: 100                               ,
  },
});

/**
 * DataEntry is a screen component designed for user Water entry.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered DataEntry screen.
 */
function WaterEntry() {
  const [waterAmount, setWaterAmount] = useState('0');

  const handleWaterEntry = () => {
    // Here you can handle the water entry, for now, we'll just log the entered value
    console.log('Water amount entered:', waterAmount);
    // You can add further logic here, such as storing the entered data, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={globalStyles.medium}>Enter Amount of Water Drank (in cups):</Text>
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
      <Button title="Submit" onPress={handleWaterEntry} />
    </View>
  );
}

export default WaterEntry;
