import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import proptypes from 'prop-types';
import { useAwards } from '../../../../contexts/AwardsContext';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    awardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    awardText: {
      marginRight: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      margin: 10,
      width: '80%',
    },
    addButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    removeButton: {
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
    },
  });

const Awards = () => {
    const { userAwards, awards, fetchUserAwards, fetchAwards } = useAwards();
    const [newAward, setNewAward] = useState('');

    console.log('AWARDS', { userAwards });
    console.log('ALL AWARDS', { awards });

    // const getAwardsToBeIssued = fetchAwardsToBeIssued();

    // console.log('AWARDS TO BE ISSUED', { getAwardsToBeIssued });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Available Awards</Text>
            {awards.map((award) => (
                <View key={award._id} style={styles.awardItem}>
                    <Text style={styles.awardName}>{award.name}</Text>
                    <Text style={styles.awardDescription}>{award.description}</Text>
                </View>
            ))}
        </ScrollView>
    );
};



Awards.proptypes = {
  awards: proptypes.array.isRequired,
  addAward: proptypes.func.isRequired,
  removeAward: proptypes.func.isRequired,
};

export default Awards;
