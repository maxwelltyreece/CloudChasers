import React from 'react';
import { TouchableOpacity, Animated, Platform, Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TabBarIcon from '../../components/TabBarIcon';
import { NavigationContainer } from '@react-navigation/native';

// Mocking Animated.Value
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper', () => {
    const NativeAnimatedHelper = jest.requireActual(
      'react-native/Libraries/Animated/src/NativeAnimatedHelper',
    );
    return {
      ...NativeAnimatedHelper,
      shouldUseNativeDriver: () => true,
    };
  });

describe('TabBarIcon', () => {
  it('renders a FontAwesome5 icon when name is not "+"', () => {
    const { getByTestId } = render(
      <TabBarIcon name="home" color="black" size={30} />,
    );
    expect(getByTestId('fontawesome-icon')).toBeTruthy();
  });

  it('calls onPress and navigation.navigate when name is "+" and TouchableOpacity is pressed', () => {
    const mockOnPress = jest.fn();
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(
      <NavigationContainer>
        <TabBarIcon
          name="+"
          color="blue"
          size={30}
          animation={new Animated.Value(1)}
          onPress={mockOnPress}
          navigation={mockNavigation}
        />
      </NavigationContainer>,
    );

    const touchableOpacity = getByTestId('touchable-opacity');
    fireEvent.press(touchableOpacity);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('+');
  });
});
