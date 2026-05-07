/**
 * skenario testing
 *
 * - LoginInput component
 *   - should render leaderboard item correctly
 *   - should display (You) when user is the logged-in user
 *   - should not display (You) when user is not the logged-in user
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import LeaderboardItem from './LeaderboardItem';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const fakeLoggedInUserLeaderboardItem = {
  'user': {
    'id': 'users-1',
    'name': 'John Doe',
    'email': 'john@example.com',
    'avatar': 'https://generated-image-url.jpg'
  },
  'score': 10
};

const fakeOtherUserLeaderBoardItem = {
  'user': {
    'id': 'users-2',
    'name': 'Jane Doe',
    'email': 'jane@example.com',
    'avatar': 'https://generated-image-url.jpg'
  },
  'score': 5
};

describe('LeaderboardItem Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render leaderboard item correctly', async () => {
    render(
      <LeaderboardItem {...fakeLoggedInUserLeaderboardItem} userId={fakeLoggedInUserLeaderboardItem.user.id} />
    );

    const image = await screen.getByAltText('user avatar');
    const avatarLink = fakeLoggedInUserLeaderboardItem.user.avatar;
    const name = fakeLoggedInUserLeaderboardItem.user.name;
    const score = fakeLoggedInUserLeaderboardItem.score;

    expect(image.src).toContain(avatarLink);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(score)).toBeInTheDocument();
  });

  it('should display (You) when user is the logged-in user', () => {
    render(<LeaderboardItem {...fakeLoggedInUserLeaderboardItem} userId={fakeLoggedInUserLeaderboardItem.user.id} />);

    expect(screen.getByText('(You)')).toBeInTheDocument();
  });

  it('should not display (You) when user is not the logged-in user', () => {
    render(<LeaderboardItem {...fakeOtherUserLeaderBoardItem} userId={fakeLoggedInUserLeaderboardItem.user.id} />);

    expect(screen.queryByText('You')).not.toBeInTheDocument();
  });
});