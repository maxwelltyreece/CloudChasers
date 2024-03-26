import React from 'react';
import {
	View, Text, StyleSheet, ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	learnMoreTitle: {
		fontFamily: 'Montserrat_700Bold',
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
		width: '100%',
	},
	headerText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 20,
		fontWeight: '700',
		marginTop: 8,
		marginBottom: 12,
		color: '#FF815E',
		left: '4%',
		alignSelf: 'flex-start',
	},
	textContainer: {
		height: 'auto',
		width: '95%',
		alignSelf: 'center',
		marginBottom: 10,
		backgroundColor: 'white',
		padding: 18,
		borderRadius: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	subheaderText: {
		fontFamily: 'Montserrat_700Bold',
		fontWeight: 'bold',
		marginBottom: 6,
	},
	contentText: {
		fontSize: 15,
	},
});

function LearnMore() {

	return (

		<View>
			<ScrollView style={styles.scrollView}>
				<Text style={styles.headerText}>Understanding Nutrition</Text>
				<Text style={styles.headerText}>Understanding Nutrition</Text>

				<View style={styles.textContainer}>
					{/* Calories */}
					<Text style={styles.subheaderText}>Calories (kcal):</Text>
					<Text style={styles.contentText}>
						<View style={styles.textContainer}>
							{/* Calories */}
							<Text style={styles.subheaderText}>Calories (kcal):</Text>
							<Text style={styles.contentText}>
					Calories are units of energy that measure how much energy food provides
					to the body. They are essential for daily activities and bodily
					functions.
							</Text>
						</View>
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Carbohydrates */}
					<Text style={styles.subheaderText}>Carbohydrates (g):</Text>
					<Text style={styles.contentText}>
						<View style={styles.textContainer}>
							{/* Carbohydrates */}
							<Text style={styles.subheaderText}>Carbohydrates (g):</Text>
							<Text style={styles.contentText}>
					The body&apos;s main source of energy, broken down into glucose.
					Found in fruits, vegetables, breads, and cereals.
							</Text>
						</View>
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Protein */}
					<Text style={styles.subheaderText}>Protein (g):</Text>
					<Text style={styles.contentText}>
					Essential for building tissues, making enzymes, and supporting immune
					function. Good sources include meat, fish, dairy, legumes, and nuts.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Fats */}
					<Text style={styles.subheaderText}>Fats (g):</Text>
					<Text style={styles.contentText}>
					Important for cell growth, organ protection, and nutrient absorption.
					Includes saturated and unsaturated fats, found in oils, butter, avocado,
					and fish.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Fibre */}
					<Text style={styles.subheaderText}>Fibre (g):</Text>
					<Text style={styles.contentText}>
					A type of carbohydrate that the body can&apos;t digest. It helps
					regulate the body&apos;s use of sugars, helping to keep hunger
					and blood sugar in check.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Water */}
					<Text style={styles.subheaderText}>Water (ml):</Text>
					<Text style={styles.contentText}>
					Crucial for life, water aids in digestion, absorption,
					circulation, and excretion. It regulates body temperature and
					maintains electrolyte balance.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Sugars */}
					<Text style={styles.subheaderText}>Sugars (g):</Text>
					<Text style={styles.contentText}>
					Simple carbohydrates that provide a quick source of energy.
					Found in fruits, vegetables, and dairy products.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Sodium */}
					<Text style={styles.subheaderText}>Sodium (mg):</Text>
					<Text style={styles.contentText}>
					An essential mineral that helps maintain the body&apos;s fluid balance.
					Found in salt, processed foods, and condiments.
					</Text>
				</View>

				<View style={styles.textContainer}>
					{/* Micronutrients */}
					<Text style={styles.subheaderText}>
						Micronutrients
						{'\n'}
						(Vitamins & Minerals):
					</Text>
					<Text style={styles.contentText}>
					Vital for health, development, and disease prevention. Vitamins
					support immune function and energy production, while minerals
					are important for growth, bone health, and fluid balance.
					</Text>
				</View>

			</ScrollView>

		</View>
	);
}

export default LearnMore;
