import React from 'react';
import { View, Text, ScrollView,} from 'react-native';
import { styles } from './styles';

/**
 * LearnMore component
 * @returns {JSX.Element} The LearnMore component
 */
function LearnMore() {
	return (
		<View>
			<ScrollView style={styles.scrollView}>
				<Text style={styles.headerText}>Understanding Nutrition</Text>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Calories (kcal):</Text>
					<Text style={styles.contentText}>
						Calories are units of energy that measure how much energy food provides
						to the body. They are essential for daily activities and bodily
						functions.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Carbohydrates (g):</Text>
					<Text style={styles.contentText}>
						The body&apos;s main source of energy, broken down into glucose.
						Found in fruits, vegetables, breads, and cereals.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Protein (g):</Text>
					<Text style={styles.contentText}>
						Essential for building tissues, making enzymes, and supporting immune
						function. Good sources include meat, fish, dairy, legumes, and nuts.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Fats (g):</Text>
					<Text style={styles.contentText}>
						Important for cell growth, organ protection, and nutrient absorption.
						Includes saturated and unsaturated fats, found in oils, butter, avocado,
						and fish.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Fibre (g):</Text>
					<Text style={styles.contentText}>
						A type of carbohydrate that the body can&apos;t digest. It helps
						regulate the body&apos;s use of sugars, helping to keep hunger
						and blood sugar in check.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Water (ml):</Text>
					<Text style={styles.contentText}>
						Crucial for life, water aids in digestion, absorption,
						circulation, and excretion. It regulates body temperature and
						maintains electrolyte balance.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Sugars (g):</Text>
					<Text style={styles.contentText}>
						Simple carbohydrates that provide a quick source of energy.
						Found in fruits, vegetables, and dairy products.
					</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.subheaderText}>Sodium (mg):</Text>
					<Text style={styles.contentText}>
						An essential mineral that helps maintain the body&apos;s fluid balance.
						Found in salt, processed foods, and condiments.
					</Text>
				</View>

				<View style={styles.textContainer}>
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
