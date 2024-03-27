import React, { useCallback, useEffect } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { useAwards } from '../../../../contexts/AwardsContext';
import { styles } from './styles';

/**
 * Awards component
 * @component
 */
const Awards = () => {
	const { userAwards, awards, fetchUserAwards, fetchAwards, fetchAwardsToBeIssued } = useAwards();

	/**
     * Fetches user awards and awards on component mount
     */
	fetchAwardsToBeIssued();

	useEffect(() => {
		fetchUserAwards();
		fetchAwards();
	}, []);

	/**
     * Fetches user awards and awards on component focus
     */
	fetchAwardsToBeIssued();

	useFocusEffect(
		useCallback(() => {
			fetchUserAwards();
			fetchAwards();
		}, [])
	);

	/**
     * Checks if an award is completed
     * @param {string} awardId - The ID of the award
     * @returns {boolean} - True if the award is completed, false otherwise
     */
	const isAwardCompleted = (awardId) => {
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
						<View style={styles.doneCheckSection} testID='icon-section'>
							{isAwardCompleted(award._id) ? (
								<Icon name="check-circle" size={24} color="green" testID='completed-icon'/>
							) : (
								<Icon name="circle" size={24} color="#FF815E" testID='not-completed-icon'/>
							)}
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

export default Awards;