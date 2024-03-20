import React, { useState } from 'react';
import {
	View, Text, Pressable, Modal, StyleSheet, ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
	learnMoreContainer: {
		flex: 1,
		// backgroundColor: '#EC6641',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignContent: 'center',
		borderRadius: 15,
		// marginLeft: 10,
		padding: 20,
		right: '1%',
		width: '98%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
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
	scrollView: {
		borderRadius: 10,
	},
	modalContainer: {
		flex: 1,
		marginVertical: 75,
		marginHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
		borderTopEndRadius: 28,
	},
	modalHeaderText: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 35,
		color: '#007BFF',
		alignSelf: 'center',
	},
	modalSubheaderText: {
		fontWeight: 'bold',
	},
	modalContentText: {
		fontSize: 16,
		marginBottom: 20,
		// textAlign: 'justify',
	},
	modalCloseButtonText: {
		color: '#FFFFFF',
		marginTop: 20,
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		overflow: 'hidden',
		alignSelf: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		letterSpacing: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		opacity: 0.9,
	},
});

function LearnMore() {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={styles.learnMoreContainer}>
			<Pressable onPress={() => setModalVisible(true)}>
				<Text style={styles.learnMoreTitle}>
    Learn More
					{'>'}
				</Text>
			</Pressable>

			<Modal
				animationType="slide"
				transparent
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>

				<View style={styles.modalContainer}>
					<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
						<Text style={styles.modalHeaderText}>Understanding Nutrition</Text>

						{/* Calories */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>Calories (kcal):</Text>
							{'\n'}
                            Calories are units of energy that measure how much energy food provides
                            to the body. They are essential for daily activities and bodily
                            functions.
						</Text>

						{/* Carbohydrates */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>Carbohydrates:</Text>
							{'\n'}
                            The body&apos;s main source of energy, broken down into glucose.
                            Found in fruits, vegetables, breads, and cereals.
						</Text>

						{/* Proteins */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>Proteins:</Text>
							{'\n'}
                            Essential for building tissues, making enzymes, and supporting immune
                            function. Good sources include meat, fish, dairy, legumes, and nuts.
						</Text>

						{/* Fats */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>Fats:</Text>
							{'\n'}
                            Important for cell growth, organ protection, and nutrient absorption.
                            Includes saturated and unsaturated fats, found in oils, butter, avocado,
                            and fish.
						</Text>

						{/* Fibre */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>Fibre:</Text>
							{'\n'}
                            A type of carbohydrate that the body can&apos;t digest. It helps
                            regulate the body&apos;s use of sugars, helping to keep hunger
                            and blood sugar in check.
						</Text>

						{/* Water */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>Water:</Text>
							{'\n'}
                            Crucial for life, water aids in digestion, absorption,
                            circulation, and excretion. It regulates body temperature and
                            maintains electrolyte balance.
						</Text>

						{/* Micronutrients */}
						<Text style={styles.modalContentText}>
							<Text style={styles.modalSubheaderText}>
								Micronutrients
								{'\n'}
								(Vitamins & Minerals):
							</Text>
							{'\n'}
                            Vital for health, development, and disease prevention. Vitamins
                            support immune function and energy production, while minerals
                            are important for growth, bone health, and fluid balance.
						</Text>

					</ScrollView>

					<Pressable onPress={() => setModalVisible(!modalVisible)}>
						<Text style={styles.modalCloseButtonText}>Close</Text>
					</Pressable>

				</View>

			</Modal>

		</View>
	);
}

export default LearnMore;
