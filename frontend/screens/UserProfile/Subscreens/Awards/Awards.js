import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { useAwards } from '../../../../contexts/AwardsContext';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    width: '100%',
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '10%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: '18%',
  },
  awardsListContainer: {
    width: '100%',
    height: '85%',
    padding: 20,
  },
  awardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: '8%',

  },
  awardDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    backgroundColor: 'green',
  },
  notCompleted: {
    backgroundColor: 'orange',
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const Awards = () => {
  const { userAwards, awards, fetchUserAwards, fetchAwards, fetchAwardsToBeIssued } = useAwards();

  useEffect(() => {
    fetchUserAwards();
    fetchAwards();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserAwards();
      fetchAwards();
    }, [])
  );

  
  console.log('userAwards:', userAwards);
  console.log('awards:', awards);

  const isAwardCompleted = (awardId) => {
    console.log('awardId:', awardId);
    return userAwards.some(((userAward) => userAward.personalAwardID === awardId));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Awards:</Text>
      </View>
      <View style={styles.awardsListContainer}>
        {awards.map((award) => (
          <View key={award._id} style={styles.awardItem}>
            <Text style={styles.awardDescription}>{award.description}</Text>
            <View style={styles.doneCheckSection}>
              {isAwardCompleted(award._id) ? (
                <Icon name="check-circle" size={24} color="green" />
              ) : (
                <Icon name="circle" size={24} color="#FF815E" />
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


Awards.proptypes = {
  awards: proptypes.array.isRequired,
  addAward: proptypes.func.isRequired,
  removeAward: proptypes.func.isRequired,
};

export default Awards;
