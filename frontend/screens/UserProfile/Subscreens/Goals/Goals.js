import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';
import proptypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { useGoals } from '../../../../contexts/GoalsContext';

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
        height: '85%',
        width: 'auto',
        // marginTop: 10,
        backgroundColor: '#FF815E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intialiseButton: {
        backgroundColor: '#FF815E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 20,
        // Comment out or adjust the following line if it's causing positioning issues
        // top: '40%',
    },
    initialiseButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
        alignSelf: 'center',
    },
    initialiseInfoText: {
        textAlign: 'center',
        fontSize: 15,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
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
        const updatedValue = goalValue.trim() === '' ? '0' : goalValue;
        onUpdate(nutrient, updatedValue);
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
                                    placeholder="Goal"
                                    returnKeyType="done"
                                    onSubmitEditing={Keyboard.dismiss}
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
    const { goals, updateGoal, createGoal, fetchGoals } = useGoals();
    const [isGoalsFetched, setIsGoalsFetched] = useState(false);
    const [fetchedGoals, setFetchedGoals] = useState([]);

    // Default nutrient goals based on recommended daily amount for each nutrient (unisex).
    const defaultMacroGoals = {
        calories: { value: 2000, unit: 'kcal' },
        protein: { value: 50, unit: 'g' },
        carbs: { value: 300, unit: 'g' },
        fat: { value: 70, unit: 'g' },
        fibre: { value: 30, unit: 'g' },
        sugar: { value: 25, unit: 'g' },
        sodium: { value: 2300, unit: 'mg' },
        water: { value: 3700, unit: 'ml' },
    };

    const nutrientUnits = {
        calories: 'kcal',
        protein: 'g',
        carbs: 'g',
        fat: 'g',
        fibre: 'g',
        sugar: 'g',
        sodium: 'mg',
        water: 'ml',
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchGoals();
            if (goals && goals.goals && goals.goals.length > 0) {
                setFetchedGoals(goals.goals);
                setIsGoalsFetched(true);
            } else {
                setIsGoalsFetched(true);
            }
        };

        if (!isGoalsFetched) {
            fetchData();
        }

    }, [fetchGoals, isGoalsFetched, goals.goals]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                await fetchGoals();
                if (goals && goals.length > 0) {
                    setFetchedGoals(goals);
                }
            };

            fetchData();
        }, [fetchGoals, goals])
    );


    const handleUpdateGoal = async (nutrient, newMaxValue) => {

        // Find the goal ID for the nutrient being updated
        const goalToUpdate = fetchedGoals.find(goal => goal.measurement === nutrient);

        if (!goalToUpdate) {
            console.error('Goal not found for nutrient:', nutrient);
            return;
        }

        try {
            await updateGoal(goalToUpdate._id, {
                maxTargetMass: newMaxValue,
            });

            // Find the index of the goal to update in the local state
            const goalIndex = fetchedGoals.findIndex(goal => goal._id === goalToUpdate._id);
            
            if (goalIndex !== -1) {
                // Create a new array with updated goal
                const newFetchedGoals = [...fetchedGoals];
                newFetchedGoals[goalIndex] = { ...newFetchedGoals[goalIndex], maxTargetMass: newMaxValue };

                setFetchedGoals(newFetchedGoals);

                await fetchGoals();
            }
        } catch (error) {
            console.error('Error updating goal GOALS:', error);
        }
    };


    const handleInitializeGoals = () => {
        // Iterate over the defaultMacroGoals and create each one
        Object.entries(defaultMacroGoals).forEach(([nutrient, goal]) => {
            // console.log(nutrient, goal, `Daily ${nutrient}`, goal.value);
            createGoal({
                goalName: `Daily ${nutrient}`,
                measurement: nutrient,
                minTargetMass: 0, // 0 as the min target mass always
                maxTargetMass: goal.value,
            });
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, marginTop: 20}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 92 : 0}
        >
            <View style={styles.container}>
                {isGoalsFetched && fetchedGoals.length === 0 && (
                    <View style={styles.container}>
                        <Pressable style={styles.intialiseButton} onPress={handleInitializeGoals}>
                            <Text style={styles.initialiseButtonText}>Initialize Goals to Begin</Text>
                        </Pressable>
                        <Text style={styles.initialiseInfoText}>(Leave page and enter again after intialising goals)</Text>
                    </View>
                )}
                <View style={styles.goalsContainer}>
                    {fetchedGoals.map((goal) => (
                        <GoalItem
                            key={goal._id}
                            nutrient={goal.measurement}
                            currentGoal={{
                                value: goal.maxTargetMass,
                                unit: nutrientUnits[goal.measurement] || ' ',
                            }}
                            onUpdate={handleUpdateGoal}
                        />
                    ))}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Goals;

