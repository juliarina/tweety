/**
 * test scenario for leaderboardReducer
 *
 * - leaderBoardReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the given isPreload value when given by SET_IS_PRELOAD action
 */

import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the given isPreload value when given by SET_IS_PRELOAD action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      }
    };

    // assign
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});