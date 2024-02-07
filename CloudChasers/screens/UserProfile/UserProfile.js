import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import SettingsButton from '../../components/SettingsButton';
import Svg, {G, Rect, Defs, ClipPath, Circle} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../styles/global';
import UserProfileOptions from './UserProfileOptions';

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

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://placekitten.com/200/200'}}
        style={styles.profilePic}
      />
      <Text style={styles.username}>Maxwell Martin</Text>
      {/*style this below*/}
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore.</Text> 
      <FlatList
                data={UserProfileOptions(navigation)}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
      <SettingsButton/>
    </View>
  );
};


const {width, height} = Dimensions.get('window');


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   profilePic: {
    width: 120,
    height: 120, 
    borderRadius: 60, 
    top: '10%',
    left: (width / 2) - (120 / 2),
  },
  username: {
    fontSize: 30,
    color: '#6B6868',
    fontFamily: 'Montserrat_400Regular'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
},
});

export default UserProfile;