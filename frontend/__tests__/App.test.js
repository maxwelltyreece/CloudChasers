import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import App from "../../App";

describe('App when user is not logged in', () => {

	it('renders the Auth screen as the initial route', async () => {

		// Mock AsyncStorage to simulate no token
		jest.mock('@react-native-async-storage/async-storage', () => ({
			getItem: jest.fn(() => Promise.resolve(null)),
		}));

		const { findByText } = render(<App />);

		const loginElement = await waitFor(() => findByText('Login'));
		const registerElement = await waitFor(() => findByText('Register'));

		expect(loginElement).toBeTruthy();
		expect(registerElement).toBeTruthy();
	});

});