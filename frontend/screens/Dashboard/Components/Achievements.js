import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import PropTypes from 'prop-types'; // Import PropTypes


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: '95%',
    width: '94%',
    left: '1.5%',
  },
  containerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingTop: 10,
  },
  motivationalMessage: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});

const AchievementsFeature = ({ userAwards, allAwards }) => {

  // console.log('USER AWARDS', userAwards);
  // console.log('ALL AWARDS', allAwards);

  const screenWidth = Dimensions.get('window').width;
  const ringSize = screenWidth * 0.26; // Ring size as a percentage of screen width, adjust as needed
  const strokeWidth = ringSize * 0.14; // Stroke width as a percentage of ring size, adjust as needed

  // Calculate the percentage of achievements completed
  const completedAchievements = userAwards ? userAwards.length : 0;
  const totalAchievements = allAwards ? allAwards.length : 0;
  const percentage = totalAchievements > 0 ? (completedAchievements / totalAchievements) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Achievements</Text>
      <AnimatedCircularProgress
        size={ringSize}
        width={strokeWidth}
        fill={percentage}
        tintColor="#FF815E"
        backgroundColor="#F0F0F0"
        padding={10}
        lineCap="round"
        rotation={0}>
        {
          () => (
            <Text style={styles.progressText}>
              {`${completedAchievements}/${totalAchievements}`}
            </Text>
          )
        }
      </AnimatedCircularProgress>
      <Text style={styles.motivationalMessage}>Keep going!</Text>
    </View>
  );
};

AchievementsFeature.propTypes = {
  userAwards: PropTypes.array.isRequired,
  allAwards: PropTypes.array.isRequired,
};

export default AchievementsFeature;

// AchievementsFeature.defaultProps = {
//   userAwards: [],
//   allAwards: [],
// };
