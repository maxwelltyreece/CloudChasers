import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import SettingsButton from '../../components/SettingsButton';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../styles/global';

/**
 * UserProfile is a screen component designed for displaying user profile information.
 * It includes a SettingsButton component and uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered UserProfile screen.
 */



const UserProfile = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
      <TouchableOpacity activeOpacity={0.3} onPress={item.handler}>
          <Text style={[styles.item, globalStyles.medium]}>{item.name}</Text>
      </TouchableOpacity>
  );

  const UserProfileOptions = [
    {
      name: 'My Meals',
      handler: () => navigation.navigate('MyMeals'),
    },
    {
      name: 'Reminders',
      handler: () => navigation.navigate('Reminders'),
    },
    {
      name: 'Goals',
      handler: () => navigation.navigate('Goals'),
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://placekitten.com/200/200'}}
        style={styles.profilePic}
      />
      <Text style={styles.username}>Maxwell Martin</Text>
      {/*style this below*/}
      <Text style={styles.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore.</Text> 
      <FlatList
                data={UserProfileOptions}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                
            />
      <SettingsButton/>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '30%',
    marginHorizontal: '5%'
  },
   profilePic: {
    width: 120,
    height: 120, 
    borderRadius: 60,
  },
  username: {
    fontSize: 30,
    color: '#6B6868',
    fontFamily: 'Montserrat_400Regular',
    paddingTop: '8%',
  },

  bio: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Montserrat_400Regular',
    padding: '2%',
  },
  item: {
    padding: 30,
    fontSize: 18,
    height: 44,
  },
});

export default UserProfile;