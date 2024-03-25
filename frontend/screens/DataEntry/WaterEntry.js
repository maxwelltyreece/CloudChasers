import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import globalStyles from '../../styles/global';
import { styles } from './styles';

function WaterEntry() {
    const [waterAmount, setWaterAmount] = useState('');

    const handleWaterEntry = () => {
        console.log('Water amount entered:', waterAmount);
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