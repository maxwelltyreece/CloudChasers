import React from 'react';
import { TouchableOpacity, Animated, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import TabBarIcon from '../../components/TabBarIcon';

jest.mock('@react-navigation/native', () => ({
	useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('TabBarIcon component', () => {
	it('renders FontAwesome5 icon if name is not "+"', () => {
		const { getByTestId } = render(
			<TabBarIcon name="home" color="black" size={20} animation={new Animated.Value(1)} onPress={() => {}} navigation={{ navigate: () => {} }} />
		);
		expect(getByTestId('fontawesome-icon')).toBeDefined();
	});

	it('renders custom icon with animation if name is "+"', () => {
		const onPressMock = jest.fn();
		const navigateMock = jest.fn();
		const animationValue = new Animated.Value(1);
		const { getByTestId } = render(
			<TabBarIcon name="+" color="black" size={20} animation={animationValue} onPress={onPressMock} navigation={{ navigate: navigateMock }} />
		);

		const touchableOpacity = getByTestId('touchable-opacity');
		fireEvent.press(touchableOpacity);

		expect(onPressMock).toHaveBeenCalled();
		expect(navigateMock).toHaveBeenCalledWith('+');
	});
});
