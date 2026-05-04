import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    }
  };
}


function asyncAddComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function upVoteThreadDetailActionCreator({ userId, previousVoteType }) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      previousVoteType
    },
  };
}

function downVoteThreadDetailActionCreator({ userId, previousVoteType }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      previousVoteType
    },
  };
}

function neutralizeVoteThreadDetailActionCreator({ userId, previousVoteType }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      previousVoteType
    },
  };
}

function asyncUpVoteThreadDetail(threadId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(upVoteThreadDetailActionCreator({ userId, previousVoteType }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      switch (previousVoteType) {
      case 0: dispatch(neutralizeVoteThreadDetailActionCreator({ userId, previousVoteType: 1 })); break;
      case -1: dispatch(downVoteThreadDetailActionCreator({ userId, previousVoteType: 1 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail(threadId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(downVoteThreadDetailActionCreator({ userId, previousVoteType }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      switch (previousVoteType) {
      case 1: dispatch(upVoteThreadDetailActionCreator({ userId, previousVoteType: -1 })); break;
      case 0: dispatch(neutralizeVoteThreadDetailActionCreator({ userId, previousVoteType: -1 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadDetail(threadId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(neutralizeVoteThreadDetailActionCreator({ userId, previousVoteType }));
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      switch (previousVoteType) {
      case 1: dispatch(upVoteThreadDetailActionCreator({ userId, previousVoteType: 0 })); break;
      case -1: dispatch(downVoteThreadDetailActionCreator({ userId, previousVoteType: 0 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function upVoteCommentActionCreator({ commentId, userId, previousVoteType }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      previousVoteType
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId, previousVoteType }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      previousVoteType
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId, previousVoteType }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      previousVoteType
    },
  };
}

function asyncUpVoteComment(threadId, commentId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(upVoteCommentActionCreator({ commentId, userId, previousVoteType }));
    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      switch (previousVoteType) {
      case 0: dispatch(neutralizeVoteCommentActionCreator({ commentId, userId, previousVoteType: 1 })); break;
      case -1: dispatch(downVoteCommentActionCreator({ commentId, userId, previousVoteType: 1 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(threadId, commentId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(downVoteCommentActionCreator({ commentId, userId, previousVoteType }));
    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      switch (previousVoteType) {
      case 1: dispatch(upVoteCommentActionCreator({ commentId, userId, previousVoteType: -1 })); break;
      case 0: dispatch(neutralizeVoteCommentActionCreator({ commentId, userId, previousVoteType: -1 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment(threadId, commentId, userId, previousVoteType) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(neutralizeVoteCommentActionCreator({ commentId, userId, previousVoteType }));
    try {
      await api.neutralizeVoteComment(threadId, commentId);
    } catch (error) {
      switch (previousVoteType) {
      case 1: dispatch(upVoteCommentActionCreator({ commentId, userId, previousVoteType: 0 })); break;
      case -1: dispatch(downVoteCommentActionCreator({ commentId, userId, previousVoteType: 0 })); break;
      }
      alert(error);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  addCommentActionCreator,
  asyncAddComment,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};