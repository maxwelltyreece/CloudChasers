// // React Imports
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// // Style Imports
// import dashboardStyles from '../../styles/DashboardStyles';

// const GoalProgressBar = ({ goal, current }) => {
//   const progressPercent = (current / goal) * 100;

//   return (
//     <View style={dashboardStyles.progressBarComponentContainer}>

//       <Text style={dashboardStyles.progressBarTitle}>Current Progress: </Text>

//       <View style={dashboardStyles.currentGoalSection}>

//         <Text style={dashboardStyles.text}>(160g Protein / Day)</Text> {/* pass in current goal name */}

//         <TouchableOpacity style={dashboardStyles.selectGoalButton}>
//             <Text style={dashboardStyles.selectGoalButtonText}>{current}g</Text> {/* pass in current goal progress */}
//         </TouchableOpacity>

//       </View>
    
//       <View style={dashboardStyles.progressBarContainer}>
//         <View style={dashboardStyles.emptyProgressBar} />
//         <View style={[dashboardStyles.filledProgressBar, { width: `${progressPercent}%` }]} />
//       </View>

//     </View>
//   );
// };


// export default GoalProgressBar;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import dashboardStyles from '../../styles/DashboardStyles';

const GoalProgressBar = ({ goal, current }) => {
  const progressPercent = Math.min((current / goal) * 100, 100); // Ensure not exceeding 100%

  return (
    <View style={dashboardStyles.progressBarComponentContainer}>
      
      {/* Title and Goal Info */}
      <View style={dashboardStyles.topSection}>

        <Text style={dashboardStyles.progressBarTitle}>Current Progress:</Text>
        
        <View style={dashboardStyles.goalInfoSection}>

          <Text style={dashboardStyles.currentGoalTitle}>(160g Protein / Day)</Text>

          <TouchableOpacity style={dashboardStyles.selectGoalButton}>

            <Text style={dashboardStyles.selectGoalButtonText}>Select Other Goal</Text>

          </TouchableOpacity>

        </View>

      </View>

      {/* Progress Bar */}
      <View style={dashboardStyles.progressBarContainer}>

        <View style={[dashboardStyles.filledProgressBar, { width: `${progressPercent}%` }]} />

      </View>

      <Text style={dashboardStyles.currentProgressBarText}>{current}/{goal}</Text>

    </View>
  );
};

export default GoalProgressBar;

