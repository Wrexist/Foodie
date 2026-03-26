import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders label text', () => {
    const { getByText } = render(<Badge label="Italian" />);
    expect(getByText('Italian')).toBeTruthy();
  });

  it('renders with gold variant', () => {
    const { getByText } = render(<Badge label="Top Pick" variant="gold" />);
    expect(getByText('Top Pick')).toBeTruthy();
  });

  it('renders with rose variant', () => {
    const { getByText } = render(<Badge label="Cocktail" variant="rose" />);
    expect(getByText('Cocktail')).toBeTruthy();
  });

  it('renders with sage variant', () => {
    const { getByText } = render(<Badge label="Healthy" variant="sage" />);
    expect(getByText('Healthy')).toBeTruthy();
  });
});
