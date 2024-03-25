import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
    // -------Goal Progress Bar-------//
    progressBarComponentContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: '7%',
        marginBottom: Platform.OS === 'android' ? '5%' : '2%',
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
        marginBottom: Platform.OS === 'android' ? 12 : 8,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        width: '96%',
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
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
        fontWeight: 'bold',
    },

});

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

        let finalWidth = 0;

		{(progress != undefined && progress != null && max != undefined && max != null && containerWidth != undefined && containerWidth != null) ? 
			finalWidth = safeDivision(progress, max, containerWidth) : finalWidth = 0} // Still load app of error occurs and data is any data is undefined.
		

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
                <Text style={styles.label}>{`${progress.toFixed(0) ?? 0} / ${max} ${unit}`}</Text>
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
    unit: PropTypes.string,
};

ProgressBar.defaultProps = {
    progress: 0,
    unit: '',
};


const NutritionProgress = ({ todayStats, goals }) => {
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

    let currentMacroValues = { ...initialMacroValues, ...todayStats }

    // Pre-filled with default nutrient goals based on recommended daily amount for each nutrient.
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

    // If the goals object contains goals, populate the nutrientGoals with actual values
    if (goals && goals.goals) {
        goals.goals.forEach(goal => {
            if (goal.measurement in nutrientGoals) {
                nutrientGoals[goal.measurement] = goal.maxTargetMass;
            }
        });
    }

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
                        progress={currentMacroValues[nutrient]}
                        max={nutrientGoals[nutrient]}
                        unit={nutrientUnits[nutrient]}
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
