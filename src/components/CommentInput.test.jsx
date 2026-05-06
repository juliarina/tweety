/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle comment typing correctly
 *   - should call addComment function when send button is clicked
 */

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentInput from './CommentInput';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const fakeCommentInput = 'Comment test';

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    // Arrange
    render(<CommentInput addComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText('Write something...');

    // Action
    await userEvent.type(commentInput, fakeCommentInput);

    // Assert
    expect(commentInput).toHaveValue(fakeCommentInput);
  });

  it('should call addComment function when send button is clicked', async () => {
    // Arrange
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);
    const commentInput = await screen.getByPlaceholderText('Write something...');
    await userEvent.type(commentInput, fakeCommentInput);
    const loginButton = await screen.getByRole('button', { name: 'Send' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockAddComment).toHaveBeenCalledWith(fakeCommentInput);
  });

  it('should empty comment input after send button is clicked', async () => {
    // Arrange
    render(<CommentInput addComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText('Write something...');
    await userEvent.type(commentInput, fakeCommentInput);
    const loginButton = await screen.getByRole('button', { name: 'Send' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(commentInput).toHaveValue('');
  });
});