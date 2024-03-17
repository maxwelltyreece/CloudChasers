import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, TextInput, ScrollView } from 'react-native';
import proptypes from 'prop-types';
import { useGoals } from '../../../contexts/GoalsContext';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 50,
        backgroundColor: '#F0F0F0',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'lightgreen',
    },
    goalsContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'green',
        paddingTop: '11%',
        paddingBottom: '7%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalsListContainer: {
        width: '100%',
        // height: '100%',
        // backgroundColor: 'green',
        paddingTop: 20,
        marginBottom: 20,
    },
    listItem: {
        height: '10%',
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 12,
        borderColor: '#eee',
        width: '90%',
        alignSelf: 'center',
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoSection: {
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'red',
        width: '60%',
        height: '100%',
        padding: 10,
    },
    buttonSection: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%',
        // backgroundColor: 'blue',
    },
    currentGoalInfoSection: {
        // marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',

    },
    currentGoalInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    currentGoalInfoText: {
        fontSize: 18,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    input: {
        height: '82%',
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        // marginTop: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        // backgroundColor: 'blue',
        alignSelf: 'center',
    },
    button: {
        height: '82%',
        // marginTop: 10,
        backgroundColor: '#FF815E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateGoalButton: {
        height: '82%',
        // marginTop: 10,
        backgroundColor: '#FF815E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
    },
});


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

    const handleCancel = () => {
        setGoalValue(currentGoal.value.toString());
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