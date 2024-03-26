import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable,
} from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types'; // Import PropTypes
import { styles } from './styles';

function CustomCheckbox({ label, isChecked, onCheck }) {
	return (
		<Pressable onPress={onCheck} style={styles.checkboxContainer}>
			<View style={styles.checkbox}>
				{isChecked && <View style={styles.checkboxIndicator} />}
			</View>
			<Text style={styles.checkboxText}>{label}</Text>
		</Pressable>
	);
}

function NewGroup() {
	const [communityName, setCommunityName] = useState('');
	const [communityDescription, setCommunityDescription] = useState('');
	const [isPrivateCommunity, setIsPrivateCommunity] = useState(false);
	const [areRecipesPrivate, setAreRecipesPrivate] = useState(false);

	const { createCommunity, getUserCommunities } = useCommunity();
    const navigation = useNavigation();

    const handleButtonPress = async () => {
        const communityData = {
            name: communityName,
            description: communityDescription,
            joinPrivacy: isPrivateCommunity ? 'private' : 'public',
            recipePrivacy: areRecipesPrivate ? 'private' : 'public',
        };
        createCommunity(communityData)
            .then((response) => {
                if (response && response.success) {
                    // console.log('Successfully created community:', response);
                    getUserCommunities();
                    navigation.navigate('Groups');
                } else {
                    console.error('Failed to create community:', response);
                }
            })
            .catch(error => {
                console.error("Error creating community: ", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Community</Text>
            <TextInput
                style={styles.input}
                placeholder="Community Name"
                value={communityName}
                onChangeText={setCommunityName}
            />
            <TextInput
                style={styles.input}
                placeholder="Community Description"
                value={communityDescription}
                onChangeText={setCommunityDescription}
            />
            <View style={{alignItems: 'flex-start', width: '80%'}}>
                <CustomCheckbox
                    label="Private Community"
                    isChecked={isPrivateCommunity}
                    onCheck={() => setIsPrivateCommunity(!isPrivateCommunity)}
                />
                <CustomCheckbox
                    label="Make Recipes Private"
                    isChecked={areRecipesPrivate}
                    onCheck={() => setAreRecipesPrivate(!areRecipesPrivate)}
                />
            </View>
            <Pressable style={styles.buttonContainer} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Create Group</Text>
            </Pressable>
        </View>
    );
}

export default NewGroup;

CustomCheckbox.propTypes = {
    label: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
};