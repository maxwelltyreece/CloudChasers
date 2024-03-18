import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';

const nutrientUnits = {
    calories: 'kcal',
    protein: 'g',
    carbs: 'g',
    fat: 'g',
    fibre: 'g',
    sugar: 'g',
    sodium: 'mg',
    water: 'ml',
};

const styles = StyleSheet.create({
    // -------Goal Progress Bar-------//
    progressBarComponentContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: '7%',
        marginBottom: Platform.OS === 'android' ? '8%' : 0,
        borderRadius: 15,
        width: '100%',
        height: '100%',
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginTop: '1%',
        backgroundColor: '#F0F0F0',
        borderRadius: 32,
        overflow: 'hidden',
        width: '100%',
        height: 15,
    },
    filledProgressBar: {
        backgroundColor: '#FF815E',
        height: 15,
        borderRadius: 32,
    },
    progressBarItem: {
        marginBottom: Platform.OS === 'android' ? 10 : 5,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        width: '98%',
        height: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignSelf: 'center',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    
});

// ProgressBar component
const ProgressBar = ({ label, progress, max, unit }) => {

    const [containerWidth, setContainerWidth] = useState(0);
    const animatedWidth = useRef(new Animated.Value(0)).current;

    // Function to measure the width of the container
    const measureContainer = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };


    useEffect(() => {
        // Safe division function to avoid dividing by zero
        const safeDivision = (numerator, denominator, containerWidth) => {
            if (denominator > 0) {
                return (numerator / denominator) * containerWidth;
            } else {
                // Default to 0 or any other fallback width
                return 0;
            }
        };
    
        const finalWidth = safeDivision(progress, max, containerWidth);
    
        Animated.timing(animatedWidth, {
            toValue: finalWidth,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [progress, max, containerWidth]);
    

    return (
        <View style={styles.progressBarItem}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                {/* Use the unit prop to display the unit next to the max value */}
                <Text style={styles.label}>{`${progress} / ${max} ${unit}`}</Text>
            </View>
            <View style={styles.progressBarContainer} onLayout={measureContainer}>
                <Animated.View style={[styles.filledProgressBar, { width: animatedWidth }]} />
            </View>
        </View>
    );
};

ProgressBar.propTypes = {
    label: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    unit: PropTypes.string, // Add unit to PropTypes
};



const NutritionProgress = ({ todayStats, goals }) => {

    // console.log('Today Stats: COMPONMENT', todayStats);
    // console.log('Goals: COMPONENT', goals);

    // Initializing an object to hold the nutrient goals
    let nutrientGoals = {
      calories: 0,
      fat: 0,
      sodium: 0,
      carbs: 0,
      water: 0,
      protein: 0,
      sugar: 0,
      fibre: 0,
    };
  
    // If the goals object contains goals, populate the nutrientGoals with actual values
    if (goals && goals.goals) {
        goals.goals.forEach(goal => {
            if (goal.measurement in nutrientGoals) {
                nutrientGoals[goal.measurement] = goal.maxTargetMass;
            }
        });
    }

    // console.log('Nutrient Goals:', nutrientGoals);
    // console.log('Today Stats TEST:', todayStats['carbs']);
  
    // Define the list of nutrients we want to display progress bars for
    const nutrientsOfInterest = ['carbs', 'fat', 'sodium', 'sugar', 'fibre'];
  
    return (
      <View style={styles.progressBarComponentContainer}>
        {nutrientsOfInterest.map((nutrient) => {
            // Check if todaysStats contains the nutrient, and goals were provided for it
                return (
                    <ProgressBar
                        key={nutrient}
                        label={nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} // Capitalize the first letter for display
                        progress={todayStats[nutrient]}
                        max={nutrientGoals[nutrient]}
                        unit={nutrientUnits[nutrient]} // Assuming grams as a default unit, adjust if necessary
                    />
                );
        })}
      </View>
    );
  };
  
  NutritionProgress.propTypes = {
    todayStats: PropTypes.object.isRequired,
    goals: PropTypes.object,
  };
  
  
  export default NutritionProgress;
