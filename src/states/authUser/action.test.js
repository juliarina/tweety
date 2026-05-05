/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch actions correctly when login and data fetching success
 *  - should dispatch action and call alert correctly when login failed
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeUserDataInput = {
  email: 'john@example.com',
  password: 'john123'
};

const fakeUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

const fakeAuthUser = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch actions correctly when login and data fetching success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeUserToken);
    api.putAccessToken = () => {};
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(fakeUserDataInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = () => {};
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(fakeUserDataInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeUserToken);
    api.putAccessToken = () => {};
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(fakeUserDataInput)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});