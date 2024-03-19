import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable, StyleSheet,
} from 'react-native';
import { useCommunity } from '../../contexts/CommunityContext';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types'; // Import PropTypes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100%',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        color: '#6B6868',
        fontFamily: 'Montserrat_700Bold',
    },
    input: {
        height: 50,
        backgroundColor: '#F7F7F7',
        marginBottom: 20,
        padding: 8,
        fontFamily: 'Montserrat_600SemiBold',
        borderRadius: 20,
        color: '#6B6868',
        width: '90%',
        paddingLeft: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#6B6868',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxIndicator: {
        height: 12,
        width: 12,
        backgroundColor: '#6B6868',
    },
    // buttonContainer: {
    //     marginTop: 24,
    //     alignItems: 'center',
    //     width: '100%',
    // },
    buttonText: {
        color: 'white',
        fontFamily: 'Montserrat_600SemiBold',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF815E',
        marginTop: 20,
        padding: 15,
        borderRadius: 30,
        width: '70%',
    },
    checkboxText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#6B6868',
    },
});

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
                    console.log('Successfully created community:', response);
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