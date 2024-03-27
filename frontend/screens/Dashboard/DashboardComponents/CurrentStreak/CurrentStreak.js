// React Imports
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * Renders the current streak component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.streak - The current streak value.
 * @returns {JSX.Element} The rendered current streak component.
 */
function CurrentStreak({ streak }) {

	let finalStreak;

	if (streak === 0) {
		finalStreak = 1;
	} else {
		finalStreak = streak;
	}

	return (
		<View style={styles.currentStreakContainer}>
			<Text style={styles.streakText}>
				{finalStreak}
			</Text>
		</View>
	);
}

CurrentStreak.PropTypes = {
	streak: PropTypes.number.isRequired,
};

export default CurrentStreak;
