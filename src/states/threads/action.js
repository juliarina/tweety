import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD: 'RECEIVE_THREAD',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREAD,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId, previousVoteType }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      previousVoteType
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId, previousVoteType }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      previousVoteType
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId, previousVoteType }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      previousVoteType
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(upVoteThreadActionCreator({ threadId, userId, previousVoteType }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      console.log(previousVoteType, ' ', userId, ' ', threadId);
      switch (previousVoteType) {
      case -1: dispatch(downVoteThreadActionCreator({ threadId, userId, previousVoteType: 1 })); break;
      case 0: dispatch(neutralizeVoteThreadActionCreator({ threadId, userId, previousVoteType: 1 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(downVoteThreadActionCreator({ threadId, userId, previousVoteType }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      switch (previousVoteType) {
      case 1: dispatch(upVoteThreadActionCreator({ threadId, userId, previousVoteType: -1 })); break;
      case 0: dispatch(neutralizeVoteThreadActionCreator({ threadId, userId, previousVoteType: -1 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(neutralizeVoteThreadActionCreator({ threadId, userId, previousVoteType }));
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      switch (previousVoteType) {
      case 1: dispatch(upVoteThreadActionCreator({ threadId, userId, previousVoteType: 0 })); break;
      case -1: dispatch(downVoteThreadActionCreator({ threadId, userId, previousVoteType: 0 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}


export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};