import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, Text, Animated, Pressable, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import { useReminders } from "../../../../contexts/RemindersContext";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { styles } from "./styles";


/**
 * ProgressBar component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.label - The label for the progress bar
 * @param {number} props.progress - The current progress
 * @param {number} props.max - The maximum value for the progress
 * @param {string} props.unit - The unit of measurement for the progress
 * @returns {JSX.Element} The ProgressBar component
 */
const ProgressBar = ({ label, progress, max, unit }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const progressBarStyle =
    label === "Calories"
      ? styles.calorieProgressBarItem
      : label === "Water"
      ? styles.waterProgressBarItem
      : styles.progressBarItem;

  const labelStyle =
    label === "Calories"
      ? styles.firstLabel
      : label === "Water"
      ? styles.firstLabel
      : styles.label;

  const measureContainer = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  useEffect(() => {
    const safeDivision = (numerator, denominator, containerWidth) => {
      if (denominator > 0) {
        return (numerator / denominator) * containerWidth;
      } else {
        return 0;
      }
    };

    let finalWidth = 0;

    {
      progress != undefined &&
      progress != null &&
      max != undefined &&
      max != null &&
      containerWidth != undefined &&
      containerWidth != null
        ? (finalWidth = safeDivision(progress, max, containerWidth))
        : (finalWidth = 0);
    }

    Animated.timing(animatedWidth, {
      toValue: finalWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, max, containerWidth]);

  return (
    <View style={progressBarStyle}>
      <View style={styles.labelContainer}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={labelStyle}>{`${progress ?? 0} / ${max} ${unit}`}</Text>
      </View>
      <View style={styles.progressBarContainer} onLayout={measureContainer}>
        <Animated.View
          style={[styles.filledProgressBar, { width: animatedWidth }]}
        />
      </View>
    </View>
  );
};

ProgressBar.PropTypes = {
  label: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  unit: PropTypes.string,
};

ProgressBar.defaultProps = {
  progress: 0,
  unit: "",
};

/**
 * ReminderItem component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.reminder - The reminder object
 * @returns {JSX.Element} The ReminderItem component
 */
const ReminderItem = ({ reminder }) => {
  return (
    <View style={styles.reminderItem}>
      <Text style={styles.reminderDescriptionText} numberOfLines={1}>
        {reminder.description}
      </Text>
      <View style={styles.reminderInfoSection}>
        <Text style={styles.reminderInfoTitle}>Time: </Text>
        <Text style={styles.reminderInfoText}>{reminder.time}</Text>
        <Text style={styles.reminderInfoTitle}>Frequency: </Text>
        <Text style={styles.reminderInfoText}>{reminder.frequency}</Text>
      </View>
    </View>
  );
};
ReminderItem.PropTypes = {
  reminder: PropTypes.object.isRequired,
};

ReminderItem.defaultProps = {
  reminder: {},
};

/**
 * Main GoalProgressBar component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.todayStats - The statistics for today
 * @param {Object} props.goals - The goals object
 * @returns {JSX.Element} The GoalProgressBar component
 */
function GoalProgressBar({ todayStats, goals }) {
  const { reminders } = useReminders();
  const navigation = useNavigation();

  let initialMacroValues = {
    calories: 0,
    water: 0,
    fat: 0,
    sodium: 0,
    carbs: 0,
    protein: 0,
    sugar: 0,
    fibre: 0,
  };

  let currentMacroValues = { ...initialMacroValues };

  Object.keys(todayStats).forEach((key) => {
    if (todayStats[key] !== null && todayStats[key] !== undefined) {
      currentMacroValues[key] = todayStats[key];
    }
  });

  Object.keys(currentMacroValues).forEach((key) => {
    currentMacroValues[key] = parseInt(currentMacroValues[key].toFixed(0));
  });

  let nutrientGoals = {
    calories: 2000,
    fat: 70,
    sodium: 2300,
    carbs: 300,
    water: 3700,
    protein: 50,
    sugar: 25,
    fibre: 30,
  };

  if (goals && goals.goals) {
    goals.goals.forEach((goal) => {
      if (goal.measurement in nutrientGoals) {
        nutrientGoals[goal.measurement] = goal.maxTargetMass;
      }
    });
  }

  function getClosestDate(reminder) {
    let now = moment();
    let reminderTime = moment(reminder.time, "hh:mm A");

    let closestDate = now
      .clone()
      .hour(reminderTime.hour())
      .minute(reminderTime.minute());

    if (reminder.frequency === "daily") {
      if (now.isAfter(closestDate)) {
        closestDate.add(1, "days");
      }
    } else if (reminder.frequency === "weekly") {
      let nextMonday = new Date(closestDate);
      nextMonday.setDate(
        closestDate.getDate() + ((1 + 7 - closestDate.getDay()) % 7)
      );
      if (now > closestDate) {
        nextMonday.setDate(nextMonday.getDate() + 7);
      }
      closestDate = nextMonday;
    }

    return {
      date: closestDate,
      isDaily: reminder.frequency.toLowerCase() === "daily",
    };
  }

  let sortedReminders = reminders.sort((a, b) => {
    let aClosest = getClosestDate(a);
    let bClosest = getClosestDate(b);

    let now = new Date();
    let isMondaySoon = now.getDay() === 0 || now.getDay() === 1;

    if (!isMondaySoon && aClosest.isDaily !== bClosest.isDaily) {
      return aClosest.isDaily ? -1 : 1;
    } else if (aClosest.isDaily === bClosest.isDaily || isMondaySoon) {
      return aClosest.date - bClosest.date;
    }
  });

  return (
    <View style={styles.progressBarComponentContainer}>
      <Swiper showsButtons={false} loop={false} activeDotColor="white">
        <View style={styles.firstSlideContainer}>
          <Text style={styles.slideTitle}>Today</Text>
          <ProgressBar
            label="Calories"
            progress={currentMacroValues.calories}
            max={nutrientGoals.calories}
            unit="kcal"
          />
          <ProgressBar
            label="Water"
            progress={currentMacroValues.water}
            max={nutrientGoals.water}
            unit="ml"
          />
        </View>

        <View style={styles.slideContainer}>
          <Text style={styles.slideTitle}>Reminders</Text>
          {reminders.length > 0 ? (
            <Pressable
              style={styles.seeAllRemindersButton}
              onPress={() =>
                navigation.navigate("User", { screen: "Reminders" })
              }
              testID="see-all-reminders-button"
            >
              <Text style={styles.seeAllRemindersButtonText}>
                See All Reminders
              </Text>
            </Pressable>
          ) : null}
          <ScrollView style={styles.remindersScrolView}>
            {sortedReminders.length > 0 ? (
              sortedReminders.map((reminder, index) => (
                <ReminderItem key={index} reminder={reminder}/>
              ))
            ) : (
              <View style={styles.emptyRemindersSection}>
                <Text style={styles.emptyRemindersTitle}>No reminders. </Text>
                <Text style={styles.emptyRemindersText}>
                  Go to the reminders page to add some!
                </Text>
                <Pressable
                  style={styles.seeAllRemindersButton}
                  onPress={() =>
                    navigation.navigate("User", { screen: "Reminders" })
                  }
                  testID="add-reminders-button"
                >
                  <Text style={styles.seeAllRemindersButtonText}>
                    Add Reminders
                  </Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </Swiper>
    </View>
  );
}

GoalProgressBar.PropTypes = {
  todayStats: PropTypes.object.isRequired,
  goals: PropTypes.any.isRequired,
};

export default GoalProgressBar;
