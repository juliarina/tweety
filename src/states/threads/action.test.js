/**
 * skenario test
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when adding data success
 *  - should dispatch action and call alert correctly when adding data failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { addThreadActionCreator, asyncAddThread } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeThreadData = {
  'id': 'thread-1',
  'title': 'Thread Pertama',
  'body': 'Ini adalah thread pertama',
  'category': 'General',
  'createdAt': '2021-06-21T07:00:00.000Z',
  'ownerId': 'users-1',
  'upVotesBy': [],
  'downVotesBy': [],
  'totalComments': 0
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    // delete backup data
    delete api._createThread;
  });

  it('should dispatch action correctly when adding data success', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeThreadData);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncAddThread(fakeThreadData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadData));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when adding data failed', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncAddThread(fakeThreadData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});