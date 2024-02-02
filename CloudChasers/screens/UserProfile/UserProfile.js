import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import SettingsButton from '../../components/SettingsButton';
import Svg, {G, Rect, Defs, ClipPath, Circle} from 'react-native-svg';
import globalStyles from '../../styles/global';

/**
 * UserProfile is a screen component designed for displaying user profile information.
 * It includes a SettingsButton component and uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered UserProfile screen.
 */



const UserProfile = () => {
  return (
    <View style={styles.container}>
      <BackgroundSvg />
      <Image
        source={{uri: 'https://placekitten.com/200/200'}}
        style={styles.profilePic}
      />
      <Text style={styles.username}>Maxwell Martin</Text>
      {/*style this below*/}
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore.</Text> 
      <SettingsButton/>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const BackgroundSvg = () => (
  <Svg width={width} height={height} viewBox="0 0 390 844" fill="none">
    <Defs>
      <ClipPath id="clip0_113_195">
        <Rect width="390" height="844" fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip0_113_195)">
      <Rect width="390" height="844" fill="#FF815E" />
      <Circle cx="194.5" cy="430.5" r="264.5" fill="white" stroke="#CFCDCD" strokeWidth="8" />
      <Rect y="267" width="390" height="577" fill="white" />
    </G>
  </Svg>
);

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
    position: 'absolute',
    top: '10%',
    left: (width / 2) - (120 / 2),
  },
  username: {
    position: 'absolute',
    top: '28%',
    fontSize: 30,
    color: '#6B6868',
    fontFamily: 'Montserrat_400Regular'
  },
});

export default UserProfile;