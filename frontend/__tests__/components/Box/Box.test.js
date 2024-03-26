import React from 'react';
import { render } from '@testing-library/react-native';
import Box from '../../../components/box';

describe('Box component', () => {
	test('renders correctly with title', () => {
		const { getByText } = render(<Box title="Test Title" />);
		const titleElement = getByText('Test Title');
		expect(titleElement).toBeTruthy();
	});

	test('renders image if provided', () => {
		const { getByTestId } = render(<Box title="Test Title" image="test-image-uri" />);
		const imageElement = getByTestId('image');
		expect(imageElement).toBeTruthy();
	});

	test('does not render image if not provided', () => {
		const { queryByTestId } = render(<Box title="Test Title" />);
		const imageElement = queryByTestId('image');
		expect(imageElement).toBeNull();
	});
});
