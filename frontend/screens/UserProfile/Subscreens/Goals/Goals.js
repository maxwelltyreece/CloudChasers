import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput} from 'react-native';
import proptypes from 'prop-types';
import { useGoals } from '../../../../contexts/GoalsContext';
import { styles } from './styles';

const GoalItem = ({ nutrient, currentGoal, onUpdate }) => {
    const [goalValue, setGoalValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Update the goalValue state when the currentGoal changes
    useEffect(() => {
        setGoalValue(currentGoal.value.toString());
    }, [currentGoal]);

    const handleUpdate = () => {
        onUpdate(nutrient, goalValue);
        setIsEditing(false);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <View style={styles.listItem}>

            {isEditing ? (
                <>
                    <View style={styles.goalSection}>
                        <View style={styles.infoSection}>
                            <View style={styles.currentGoalInfoSection}>
                                <Text style={styles.currentGoalInfoTitle}>{capitalizeFirstLetter(nutrient)}: </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setGoalValue}
                                    value={goalValue}
                                    keyboardType="numeric"
                                    placeholder="Enter new goal"
                                />
                            </View>
                        </View>
                        <View style={styles.buttonSection}>
                            <Pressable style={styles.button} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>Update Goal</Text>
                            </Pressable>
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.goalSection}>
                    <View style={styles.infoSection}>
                        <View style={styles.currentGoalInfoSection}>
                            <Text style={styles.currentGoalInfoTitle}>{capitalizeFirstLetter(nutrient)}: </Text>
                            <Text style={styles.currentGoalInfoText}>{currentGoal.value} {currentGoal.unit}</Text>
                        </View>
                    </View>
                    {/* <Text style={styles.text}>{nutrient.toUpperCase()}: {currentGoal.value} {currentGoal.unit}</Text> */}
                    <View style={styles.buttonSection}>
                        <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
                            <Text style={styles.buttonText}>Change Goal</Text>
                        </Pressable>
                    </View>
                </View>
            )}

        </View>
    );
};

GoalItem.propTypes = {
    nutrient: proptypes.string.isRequired,
    currentGoal: proptypes.object.isRequired,
    onUpdate: proptypes.func.isRequired,
};



const Goals = () => {
    const { macroGoals, updateMacroGoals, fetchMacroGoals } = useGoals();

    useEffect(() => {
        fetchMacroGoals();
    }, [fetchMacroGoals]);

    const handleUpdateGoal = (nutrient, value) => {
        const newValue = { value: parseInt(value, 10), unit: macroGoals[nutrient].unit };
        updateMacroGoals(nutrient, newValue);
    };

    return (
        <View style={styles.container}>
            <View style={styles.goalsContainer}>
                {Object.keys(macroGoals).map((nutrient) => (
                    <GoalItem
                        key={nutrient}
                        nutrient={nutrient}
                        currentGoal={macroGoals[nutrient]}
                        onUpdate={handleUpdateGoal}
                    />
                ))
                }
            </View>

            {/* <FlatList
                style={styles.goalsListContainer}
                data={Object.keys(macroGoals)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <GoalItem
                        nutrient={item}
                        currentGoal={macroGoals[item]}
                        onUpdate={handleUpdateGoal}
                    />
                )}
            /> */}
        </View>
    );
};

export default Goals;

GoalItem.propTypes = {
    title: proptypes.string.isRequired,
};