import React, { useState, useRef } from 'react';
import { View, Pressable, StyleSheet, Animated, Text } from 'react-native';
import Modal from 'react-native-modal';
import TabBarIcon from './TabBarIcon';

const AddModal = ({ isVisible, onBackdropPress, navigator, pageNames, toggleModal}) => {
  const [highlightedButton, setHighlightedButton] = useState(null);
  const pulseAnimationFood = useRef(new Animated.Value(0)).current;
  const pulseAnimationWater = useRef(new Animated.Value(0)).current;

  const handleButtonPress = (buttonType) => {
    if (highlightedButton === buttonType) {
        toggleModal();
        navigator.navigate(pageNames[buttonType]); // Navigate if pressed twice
        setHighlightedButton(null); // Reset if pressed twice
    } else {
      setHighlightedButton(buttonType);
      startPulseAnimation(buttonType);
    }
  };

  const startPulseAnimation = (buttonType) => {
    const pulseAnimation = buttonType === 'food' ? pulseAnimationFood : pulseAnimationWater;

    Animated.sequence([
      Animated.timing(pulseAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const pulseStyle = (buttonType) => {
    const pulseAnimation = buttonType === 'food' ? pulseAnimationFood : pulseAnimationWater;

    return {
      transform: [
        {
          scale: pulseAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.1, 1],
          }),
        },
      ],
    };
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      
      backdropTransitionOutTiming={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="rgba(0,0,0,0.5)"
      animationInTiming={300}
      animationOutTiming={200}
      style={styles.modal}
    >
        <View style={styles.bubble}>
          <Text style={styles.title}>Food or Water?</Text>
          <View style={styles.content}>
            <Animated.View style={[styles.button, highlightedButton === 'food' && { backgroundColor: '#FF815E' }, pulseStyle('food')]}>
              <Pressable
                style={styles.pressable}
                onPress={() => handleButtonPress('food')}
              >
                <TabBarIcon name="utensils" size={50} color={highlightedButton === 'food' ? 'white' : 'black'} />
              </Pressable>
            </Animated.View>
            <Animated.View style={[styles.button, highlightedButton === 'water' && { backgroundColor: '#74c0fc' }, pulseStyle('water')]}>
              <Pressable
                style={styles.pressable}
                onPress={() => handleButtonPress('water')}
              >
                <TabBarIcon name="tint" size={50} color={highlightedButton === 'water' ? 'white' : 'black'} />
              </Pressable>
            </Animated.View>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 10,
  },
  bubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderColor: '#c7c7c7',
    borderWidth: 5,
    borderRadius: 30,
    padding: 20,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddModal;

