import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  //-------Whole Dashboard-------//
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#FF815E'
  },

  //-------Weclome Bar-------//
  welcomeContainer: {
    marginTop: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    padding: 20,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
  },

  //-------Past Week Logs-------//
  pastWeekContainer: {
    marginTop: 10,
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
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dayContainer: {
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
    marginVertical: 10,
    alignContent: 'flex-start',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 20,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
  },
  
});
