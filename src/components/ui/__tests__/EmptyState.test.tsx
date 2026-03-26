import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders title and subtitle', () => {
    const { getByText } = render(
      <EmptyState
        icon="restaurant-outline"
        title="No reviews"
        subtitle="Start reviewing"
      />
    );
    expect(getByText('No reviews')).toBeTruthy();
    expect(getByText('Start reviewing')).toBeTruthy();
  });

  it('renders action button when provided', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <EmptyState
        icon="add-outline"
        title="Empty"
        actionTitle="Add New"
        onAction={onAction}
      />
    );
    const button = getByText('Add New');
    expect(button).toBeTruthy();
  });

  it('does not render action button when not provided', () => {
    const { queryByText } = render(
      <EmptyState icon="search-outline" title="No results" />
    );
    expect(queryByText('Add New')).toBeNull();
  });
});
