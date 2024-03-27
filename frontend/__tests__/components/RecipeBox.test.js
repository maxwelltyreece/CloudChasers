import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import axios from 'axios';
import RecipeBox from '../../components/RecipeBox';

jest.mock('axios');

const sampleRecipe = {
	id: 1,
	title: 'Sample Recipe',
	description: 'This is a sample recipe description.',
	ingredients: [
		{ name: 'Ingredient 1', weight: 100 },
		{ name: 'Ingredient 2', weight: 200 },
	],
	imageUrl: 'https://example.com/sample_image.jpg',
};

axios.get.mockResolvedValue({ data: sampleRecipe });

describe('RecipeBox Component', () => {
	it('renders correctly', async () => {
		const { getByTestId} = render(<RecipeBox id={sampleRecipe.id} />);
      
		const recipeBox = getByTestId('recipe-box');
		expect(recipeBox).toBeTruthy();
  
		fireEvent.press(recipeBox);
  
		await Promise.resolve();
  
		console.log('Modal Content:', getByTestId('modal').textContent);
  
		fireEvent.press(recipeBox);
	});
});
