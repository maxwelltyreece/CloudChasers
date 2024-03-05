import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../../screens/IPIndex';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function Stats() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`http://${LocalIP}:3000/stats/daily-caloric-intake`, {
                    params: {
                        date: '2021-02-10T00:00:00.000Z'
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {data && <Text>{JSON.stringify(data)}</Text>}
        </View>
    );
}

export default Stats;