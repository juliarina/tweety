/**
 * skenario test
 *
 * - asyncPopulateLeaderboard thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import {  asyncPopulateLeaderboard, receiveLeaderboardActionCreator } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeLeaderboardResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 5
  }
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateLeaderboard thunk', () => {
  beforeEach(() => {
    api._getLeaderboard = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboard;

    // delete backup data
    delete api._getLeaderboard;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardActionCreator(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});