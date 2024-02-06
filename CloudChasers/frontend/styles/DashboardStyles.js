import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //-------Whole Dashboard-------//
  dashboardHeader: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    flexWrap: 'wrap',
    backgroundColor: '#F0F0F0',
  },

  middleDashboardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },

  leftComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //-------Weclome Bar-------//
  welcomeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    padding: 20,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    // fontFamily: 'Montserrat_700Bold',
  },

  //-------Past Week Logs-------//
  wholePastLogsContainer: {
    backgroundColor: '#FF815E',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    width: 410,
    padding: 10,
  },
  weekContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 20,
  },
  weeklyLogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weeklyLogDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginTop: 10,
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayName: {
    marginBottom: 4,
  },
  dailyCheckmarkContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
  },

  //-------Current Streak-------//
  currentStreakContainer: {
    flex: 1,
    backgroundColor: '#FF815E',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    padding: 20,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 10,
    width: 200,
  },
  streakTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat_700Bold',
  },
  currentStreakText: {  
      fontSize: 20,
      fontWeight: 'medium',
      // fontFamily: 'Montserrat_700Bold',
  },

  //-------Recent Meal Log-------//
  recentLogContainer : {
    backgroundColor: '#FF815E',
    justifyContent: 'flex-start',
    alignContent: 'center',
    borderRadius: 15,
    marginLeft: 5,
    marginRight: 10,
    padding: 8,
    width: 200,
    height: 215,
  },
  recentLogTitleContainer : {
    backgroundColor: '#FF815E',
    padding: 10,
  },
  innerRecentLogContainer : {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
  },
  recentLogTitle : {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recentLogDatetimeText : {
    fontSize: 12,
    fontWeight: 'medium',
  },
  recentLogMealTypeText : {
    fontSize: 15,
    fontWeight: 'bold',
  },

  //-------Learn More-------//
  learnMoreContainer: {
    flex: 1,
    backgroundColor: '#FF815E',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginLeft: 10,
    padding: 20,
    width: 200,
  },
  learnMoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  learnMoreButton: {    
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 32,
  },

  //-------Goal Progress Bar-------//
   progressBarComponentContainer: {
    backgroundColor: '#FF815E',
    padding: 25,
    marginBottom: 50,
    borderRadius: 15,
    width: 410,

  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  goalInfoSection: {
    alignItems: 'flex-end',
  },
  progressBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentGoalTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  selectGoalButton: {
    backgroundColor: '#FF815E',
    marginTop: 4,
  },
  selectGoalButtonText: {
    fontSize: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 32,
    overflow: 'hidden', // Ensures the filled part does not overflow the container's rounded corners
  },
  filledProgressBar: {
    backgroundColor: '#25A6EE',
    height: 20,
    borderRadius: 32,
  },
  currentProgressBarText: {
    fontSize: 15,
    fontWeight: 600,
    textAlign: 'left',
    marginTop: 10,
    paddingLeft: 8,
  },
  
});
