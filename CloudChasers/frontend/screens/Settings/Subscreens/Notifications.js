import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 24,
    },
    label: {
        fontSize: 14,
        ...globalStyles.bold,
    },
    separator: {
        height: 1, 
        backgroundColor: '#A9A9A9', 
        width: '100%',
    },
});

/**
 * SwitchRow component.
 * This component is used to display a single row in the notifications settings list.
 * Each row includes a label and a switch that can be toggled by the user.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.field - The label for the switch.
 * @param {boolean} props.value - The current value of the switch.
 * @param {Function} props.onToggle - The function to call when the switch is toggled.
 * @param {Object} props.trackColor - The colors to use for the switch track.
 * @param {string} props.thumbColor - The color to use for the switch thumb.
 * @returns {React.Node} The rendered component.
 */
const SwitchRow = ({ field, value, onToggle, trackColor, thumbColor }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{field}</Text>
        <Switch 
            value={value} 
            onValueChange={onToggle} 
            trackColor={trackColor}
            thumbColor={thumbColor}
        />
    </View>
);

/**
 * Notifications component.
 * This component is used to display and control the settings for email and push notifications.
 * The settings are represented as a list of switch rows, each with a label and a switch that can be toggled by the user.
 * The state of each switch is managed using the useState hook, and the toggle functions are memoized using the useCallback hook.
 *
 * @returns {React.Node} The rendered component.
 */
const Notifications = () => {
    const [email, setEmail] = useState(true);
    const [push, setPush] = useState(true);

    const toggleEmail = useCallback(() => setEmail(prev => !prev), []);
    const togglePush = useCallback(() => setPush(prev => !prev), []);

    const data = [
        { 
            field: 'Email Notifications', 
            value: email, 
            onToggle: toggleEmail,
            trackColor: { false: '#000025', true: "#81b0ff" },
            thumbColor: email ? "#f5dd4b" : "#000025",
        },
        { 
            field: 'Push Notifications', 
            value: push, 
            onToggle: togglePush,
            trackColor: { false: "#767577", true: "#ff6347" },
            thumbColor: push ? "#f5dd4b" : "#f4f3f4",
        },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.field}
                renderItem={({ item }) => <SwitchRow {...item} />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

export default Notifications;