import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    paddingBottom: 15, 
  },
  inputContainer: {
    marginBottom: 20,
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
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF815E',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
});

function FoodEntry() {
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [sugar, setSugar] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [sodium, setSodium] = useState('');

  const handleLogFood = () => {
    // Here you can handle the food logging data
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
        <Text style={styles.label}>Food Item:</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogFood}>
        <Text style={styles.buttonText}>Log Food</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default FoodEntry;
