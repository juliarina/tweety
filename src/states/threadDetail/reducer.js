import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [
        action.payload.comment,
        ...threadDetail.comments,
      ]
    };
  case ActionType.UP_VOTE_THREAD_DETAIL: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return {
      ...threadDetail,
      upVotesBy: [
        ...threadDetail.upVotesBy,
        userId,
      ],
      ...(previousVoteType === -1 && { downVotesBy: threadDetail.downVotesBy.filter((voter) => voter !== userId) })
    };
  }
  case ActionType.DOWN_VOTE_THREAD_DETAIL: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return {
      ...threadDetail,
      downVotesBy: [
        ...threadDetail.downVotesBy,
        userId,
      ],
      ...(previousVoteType === 1 && { upVotesBy: threadDetail.upVotesBy.filter((voter) => voter !== userId) })
    };
  }
  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return {
      ...threadDetail,
      ...(previousVoteType === 1 && { upVotesBy: threadDetail.upVotesBy.filter((voter) => voter !== userId) }),
      ...(previousVoteType === -1 && { downVotesBy: threadDetail.downVotesBy.filter((voter) => voter !== userId) })
    };
  }
  case ActionType.UP_VOTE_COMMENT: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: [
              ...comment.upVotesBy,
              userId,
            ],
            ...(previousVoteType === -1 && { downVotesBy: comment.downVotesBy.filter((voter) => voter !== userId) })
          };
        } else {
          return comment;
        }
      }),
    };
  }
  case ActionType.DOWN_VOTE_COMMENT: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: [
              ...comment.downVotesBy,
              userId,
            ],
            ...(previousVoteType === 1 && { upVotesBy: comment.upVotesBy.filter((voter) => voter !== userId) })
          };
        } else {
          return comment;
        }
      }),
    };
  }
  case ActionType.NEUTRALIZE_VOTE_COMMENT: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            ...(previousVoteType === 1 && { upVotesBy: comment.upVotesBy.filter((voter) => voter !== userId) }),
            ...(previousVoteType === -1 && { downVotesBy: comment.downVotesBy.filter((voter) => voter !== userId) }),
          };
        } else {
          return comment;
        }
      }),
    };
  }
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;