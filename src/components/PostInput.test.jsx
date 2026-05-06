/**
 * skenario testing
 *
 * - PostInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when create button is clicked
 */

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PostInput from './PostInput';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const fakeTitleInput = 'Thread Title Test';
const fakeCategoryInput = 'CategoryTest';
const fakeBodyInput = 'Thread Body Test';

describe('PostInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<PostInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Title');

    // Action
    await userEvent.type(titleInput, fakeTitleInput);

    // Assert
    expect(titleInput).toHaveValue(fakeTitleInput);
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<PostInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Category');

    // Action
    await userEvent.type(categoryInput, fakeCategoryInput);

    // Assert
    expect(categoryInput).toHaveValue(fakeCategoryInput);
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<PostInput addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Write something ...');

    // Action
    await userEvent.type(bodyInput, fakeBodyInput);

    // Assert
    expect(bodyInput).toHaveValue(fakeBodyInput);
  });

  it('should call addThread function when create button is clicked', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<PostInput addThread={mockAddThread} />);
    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, fakeTitleInput);
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, fakeCategoryInput);
    const bodyInput = await screen.getByPlaceholderText('Write something ...');
    await userEvent.type(bodyInput, fakeBodyInput);
    const createButton = await screen.getByRole('button', { name: 'Create' });

    // Action
    await userEvent.click(createButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: fakeTitleInput,
      category: fakeCategoryInput,
      body: fakeBodyInput
    });
  });
});