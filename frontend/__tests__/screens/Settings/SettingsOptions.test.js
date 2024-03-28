/* eslint-disable no-undef */
import SettingsOptions from '../../../screens/Settings/SettingsOptions';

describe('SettingsOptions', () => {
	it('returns the expected array of setting options', () => {
		const mockNavigate = jest.fn();
		const options = SettingsOptions({ navigate: mockNavigate });

		expect(options).toEqual([
			{ name: 'Account', handler: expect.any(Function) },
			{ name: 'About', handler: expect.any(Function) },
			{ name: 'Learn More', handler: expect.any(Function) },
		]);

		// Test that the handler functions call navigate with the expected arguments
		options.forEach((option, index) => {
			const expectedRoutes = ['Account', 'About', 'LearnMore'];
			option.handler();
			expect(mockNavigate).toHaveBeenCalledWith(expectedRoutes[index]);
		});
	});
});