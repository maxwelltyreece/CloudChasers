import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import SettingsButton from '../../components/SettingsButton';
import Svg, {G, Rect, Path, Defs, ClipPath} from 'react-native-svg';
import globalStyles from '../../styles/global';

/**
 * UserProfile is a screen component designed for displaying user profile information.
 * It includes a SettingsButton component and uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered UserProfile screen.
 */

const {width, height} = Dimensions.get('window');

const BackgroundSvg = () => (
<Svg width={width} height={height} viewBox="0 0 390 844" fill="none">
    <G clipPath="url(#clip0_113_195)">
      <Rect width="390" height="844" fill="#FF815E" />
      <Path
        d="M386.942 253.441C433.649 312.804 437.712 392.814 421.071 467.934C404.522 542.635 367.223 613.443 299.895 646.569C232.689 679.636 153.671 666.442 84.9195 633.37C17.3257 600.855 -38.6748 546.812 -56.5875 474.97C-74.7386 402.171 -53.1673 325.783 -6.75348 266.141C39.6967 206.453 108.551 168.531 183.88 166.144C261.684 163.68 339.206 192.769 386.942 253.441Z"
        fill="white"
        stroke="#E7E7E7"
        strokeWidth="10"
      />
      <Rect y="267" width="390" height="577" fill="white" />
    </G>
    <Defs>
      <ClipPath id="clip0_113_195">
        <Rect width="390" height="844" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <BackgroundSvg />
      {/* Your page content goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserProfile;