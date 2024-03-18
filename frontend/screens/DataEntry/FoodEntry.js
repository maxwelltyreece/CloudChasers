import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
});


/**
 * DataEntry is a screen component designed for user food entry.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered DataEntry screen.
 */
function FoodEntry() {
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [sugar, setSugar] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sodium, setSodium] = useState('');

  const handleLogFood = () => {
    // Here you can handle the food logging data, for now, we'll just log the entered values
    console.log('Food Item:', foodItem);
    console.log('Calories:', calories);
    console.log('Protein:', protein);
    console.log('Sugar:', sugar);
    console.log('Fat:', fat);
    console.log('Carbs:', carbs);
    console.log('Sodium:', sodium);
    // You can add further logic here, such as storing the entered data, etc.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food name:</Text>
        <TextInput
          style={styles.input}
          value={foodItem}
          onChangeText={setFoodItem}
          placeholder="Enter food item"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Calories:</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          placeholder="Enter calories"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Protein (g):</Text>
        <TextInput
          style={styles.input}
          value={protein}
          onChangeText={setProtein}
          keyboardType="numeric"
          placeholder="Enter protein"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sugar (g):</Text>
        <TextInput
          style={styles.input}
          value={sugar}
          onChangeText={setSugar}
          keyboardType="numeric"
          placeholder="Enter sugar"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Fat (g):</Text>
        <TextInput
          style={styles.input}
          value={fat}
          onChangeText={setFat}
          keyboardType="numeric"
          placeholder="Enter fat"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Carbs (g):</Text>
        <TextInput
          style={styles.input}
          value={carbs}
          onChangeText={setCarbs}
          keyboardType="numeric"
          placeholder="Enter carbs"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sodium (mg):</Text>
        <TextInput
          style={styles.input}
          value={sodium}
          onChangeText={setSodium}
          keyboardType="numeric"
          placeholder="Enter sodium"
        />
      </View>
      <Button title="Log Food" onPress={handleLogFood} />
    </ScrollView>
  );
}

export default FoodEntry;
