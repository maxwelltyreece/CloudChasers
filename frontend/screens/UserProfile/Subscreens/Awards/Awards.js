import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { useAwards } from '../../../../contexts/AwardsContext';

const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    top: '18%',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 10,
    height: '10%',
  },
  legendIcon: {
    marginRight: 5,
  },
  legendText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
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
  awardName: {
    fontFamily: 'Montserrat_700Bold',
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
    fontFamily: 'Montserrat_700Bold',
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
      <View style={styles.legendContainer}>
        <Icon name="check-circle" size={24} color="green" style={styles.legendIcon} />
        <Text style={styles.legendText}>Completed</Text>
        <Icon name="circle" size={24} color="#FF815E" style={[styles.legendIcon, { marginLeft: 32 }]} />
        <Text style={styles.legendText}>Not Completed</Text>
      </View>
      <View style={styles.awardsListContainer}>
        {awards.map((award) => (
          <View key={award._id} style={styles.awardItem}>
            <Text style={styles.awardName} numberOfLines={1}>{award.name}</Text>
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
