import React from 'react';
import {
	View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * Box component
 * This component displays a box with an optional image and a title.
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display in the box
 * @param {string} [props.image] - The URL of the image to display in the box
 */
function Box({ title, image }) {
	return (
		<View style={styles.box}>
			{image && <Image source={{ uri: image }} style={styles.image} />}
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

Box.PropTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
};

export default Box;