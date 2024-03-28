import React, { useState, useEffect } from 'react';
import {
	View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { getImageLink } from '../../services/ImageService';

/**
 * Box component
 * This component displays a box with an optional image and a title.
 * @param {Object} props - Component props
 * @param {string} props.title - The title to display in the box
 * @param {string} [props.image] - The URL of the image to display in the box
 */
function Box({ title, id }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            const url = await getImageLink('Community_Pictures', id);
            setImageUrl(url);
        };

        fetchImageUrl();
    }, [id]);

    return (
        <View style={styles.box}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} testID='image'/>}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

Box.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default Box;