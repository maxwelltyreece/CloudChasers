import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const GoalItem = ({ title }) => (
    <View style={styles.listItem}>
        <Text>{title}</Text>
    </View>
);

const Goals = () => {
    const [goals, setGoals] = useState(['Goal 1', 'Goal 2']);

    const addGoal = () => {
        setGoals((currentGoals) => [...currentGoals, `Goal ${currentGoals.length + 1}`]);
    };

    return (
        <View style={styles.screen}>
            <Button title="New Goal" onPress={addGoal} />
            <FlatList
                data={goals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <GoalItem title={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 50,
    },
    listItem: {
        padding: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10,
    },
});

export default Goals;