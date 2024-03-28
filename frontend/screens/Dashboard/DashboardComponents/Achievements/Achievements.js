import React from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { styles } from "./styles";

/** * Returns a motivational message based on the given percentage.
 * @param {number} percentage - The percentage of achievements completed.
 * @returns {string} - The motivational message.
 */
const getMotivationalMessage = (percentage) => {
  if (percentage >= 100) return "Incredible!";
  else if (percentage >= 85) return "Almost there, keep pushing!";
  else if (percentage >= 65) return "You're doing great!";
  else if (percentage >= 50) return "Keep it up!";
  else if (percentage >= 30) return "Making good progress!";
  else if (percentage >= 20) return "On your way!";
  else if (percentage >= 10) return "Off to a good start!";
  else return "Let's get started!";
};

/**
 * A component that displays the user's achievements.
 * @param {Object} props - The component's props.
 * @param {Array} props.userAwards - The awards that the user has achieved.
 * @param {Array} props.allAwards - All possible awards.
 * @returns {JSX.Element} - The rendered component.
 */
const AchievementsFeature = ({ userAwards, allAwards }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const ringSize = screenWidth * 0.26;
  const strokeWidth = ringSize * 0.14;

  const completedAchievements =
    userAwards && userAwards.length > 0 ? userAwards.length : 0;
  const totalAchievements =
    allAwards && allAwards.length > 0 ? allAwards.length : 0;
  const percentage =
    totalAchievements > 0
      ? (completedAchievements / totalAchievements) * 100
      : 0;
  const motivationalMessage = getMotivationalMessage(percentage);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("User", { screen: "Awards" })}
        style={styles.pressableContainer}
        testID="awards-widget"
      >
        <Text style={styles.containerTitle}>Awards</Text>
        <AnimatedCircularProgress
          size={ringSize}
          width={strokeWidth}
          fill={percentage}
          tintColor="#FF815E"
          backgroundColor="#F0F0F0"
          padding={10}
          lineCap="round"
          rotation={0}
        >
          {() => (
            <Text style={styles.progressText}>
              {`${completedAchievements} / ${totalAchievements}`}
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.motivationalMessage}>{motivationalMessage}</Text>
      </Pressable>
    </View>
  );
};

AchievementsFeature.propTypes = {
  userAwards: PropTypes.array.isRequired,
  allAwards: PropTypes.array.isRequired,
};

export default AchievementsFeature;
