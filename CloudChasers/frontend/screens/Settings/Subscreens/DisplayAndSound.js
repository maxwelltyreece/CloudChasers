import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import styles from '../../../styles/DisplayAndSoundStyles';

const SwitchRow = ({ item }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{`${item.field}: ${item.text}`}</Text>
        <Switch 
            value={item.value} 
            onValueChange={item.action} 
            trackColor={item.trackColor}
            thumbColor={item.thumbColor}
        />
    </View>
);

/**
 * A component that renders a list of display and sound settings.
 * Each setting is represented by a switch that the user can toggle.
 * The current state of each setting is stored in a local state variable.
 * The `theme` state variable represents the current theme (true for dark, false for light).
 * The `sound` state variable represents whether sound is enabled (true for on, false for muted).
 * The `data` array contains the configuration for each setting, including its current value,
 * the action to toggle it, the text to display, and the colors for the switch.
 * The component renders a FlatList, with each item in the list being a row with a label and a switch.
 * @param {Object} props The component props.
 * @param {Object} props.navigation The navigation object from react-navigation.
 * @returns {React.Element} A view component with a list of display and sound settings.
 */
const DisplayAndSound = ({ navigation }) => {
    const [theme, setTheme] = useState(true);
    const [sound, setSound] = useState(true);

    const data = useMemo(() => [
        { 
            field: 'Theme', 
            value: theme, 
            action: () => setTheme(!theme),
            text: theme ? 'Dark' : 'Light',
            trackColor: { false: '#000025', true: "#81b0ff" },
            thumbColor: theme ? "#f5dd4b" : "#f4f3f4",
        },
        { 
            field: 'Sound', 
            value: sound, 
            action: () => setSound(!sound),
            text: sound ? 'On' : 'Muted',
            trackColor: { false: "#000025", true: "#81b0ff" },
            thumbColor: sound ? "#f5dd4b" : "#f4f3f4",
        },
    ], [theme, sound]);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.field}
                renderItem={({ item }) => <SwitchRow item={item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

export default DisplayAndSound;