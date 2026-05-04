import { ActionType } from './action';

function threadReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.UP_VOTE_THREAD: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: [
            ...thread.upVotesBy,
            userId,
          ],
          ...(previousVoteType === -1 && { downVotesBy: thread.downVotesBy.filter((voter) => voter !== userId) })
        };
      } else {
        return thread;
      }
    });
  }
  case ActionType.DOWN_VOTE_THREAD: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          downVotesBy: [
            ...thread.downVotesBy,
            userId,
          ],
          ...(previousVoteType === 1 && { upVotesBy: thread.upVotesBy.filter((voter) => voter !== userId) })
        };
      } else {
        return thread;
      }
    });
  }
  case ActionType.NEUTRALIZE_VOTE_THREAD: {
    const userId = action.payload.userId;
    const previousVoteType = action.payload.previousVoteType;
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          ...(previousVoteType === -1 && { downVotesBy: thread.downVotesBy.filter((voter) => voter !== userId) }),
          ...(previousVoteType === 1 && { upVotesBy: thread.upVotesBy.filter((voter) => voter !== userId) })
        };
      } else {
        return thread;
      }
    });
  }
  default:
    return threads;
  }
}

export default threadReducer;