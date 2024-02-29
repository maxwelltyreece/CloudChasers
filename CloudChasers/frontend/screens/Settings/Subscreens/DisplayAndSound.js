import React, { useState } from 'react';
import {
	View, Text, StyleSheet, Switch, FlatList,
} from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 24,
	},
	label: {
		fontSize: 14,
		...globalStyles.bold,
	},
	separator: {
		height: 1,
		backgroundColor: '#A9A9A9',
		width: '100%',
	},
});

function DisplayAndSound() {
	const [theme, setTheme] = useState(true);
	const [sound, setSound] = useState(true);
	const data = [
		{
			field: 'Theme',
			value: theme,
			action: () => setTheme(!theme),
			text: theme ? 'Dark' : 'Light',
			trackColor: { false: '#000025', true: '#81b0ff' },
			thumbColor: theme ? '#f5dd4b' : '#000025',
		},
		{
			field: 'Sound',
			value: sound,
			action: () => setSound(!sound),
			text: sound ? 'On' : 'Muted',
			trackColor: { false: '#767577', true: '#ff6347' },
			thumbColor: sound ? '#f5dd4b' : '#f4f3f4',
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				keyExtractor={(item) => item.field}
				renderItem={({ item }) => (
					<View style={styles.row}>
						<Text style={styles.label}>{`${item.field}: ${item.text}`}</Text>
						<Switch
							value={item.value}
							onValueChange={item.action}
							trackColor={item.trackColor}
							thumbColor={item.thumbColor}
						/>
					</View>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListFooterComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

export default DisplayAndSound;
