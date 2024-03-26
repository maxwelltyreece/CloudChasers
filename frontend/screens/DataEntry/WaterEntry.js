import React, { useState } from 'react';
import { Alert, View, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../../styles/global';
import { styles } from './styles';
import { useFoodLog } from '../../contexts/FoodLogContext';
import { useNavigation } from '@react-navigation/native';

function WaterEntry() {
	const [waterAmount, setWaterAmount] = useState('');
	const { logWater } = useFoodLog();
	const navigation = useNavigation();
	const handleWaterEntry = () => {
		if (!waterAmount) {
			Alert.alert('Error', 'Please fill all fields');
			return;
		}
		// console.log('Logging water:', waterAmount);
		logWater({ weight: waterAmount });
		// console.log('Water logged');
		Alert.alert(
			'Water Logged',
			'Want to log more water?',
			[
				{
					text: 'Yes',
					onPress: () => {
						setWaterAmount('');
					}
				},
				{
					text: 'No',
					onPress: () => {
						navigation.goBack();
					}
				},
			],
			{ cancelable: false },
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.semiCircle} />
			<Text style={styles.label}>Log water consumed (ml):</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					value={waterAmount}
					onChangeText={(text) => setWaterAmount(text)}
					placeholder="..."
					returnKeyType='done'
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleWaterEntry}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</View>
	);
}

export default WaterEntry;