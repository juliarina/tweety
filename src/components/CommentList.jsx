import React from 'react';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import { asyncUpVoteComment, asyncDownVoteComment, asyncNeutralizeVoteComment } from '../states/threadDetail/action';
import PropTypes from 'prop-types';

function CommentList({ threadId, comments, authUser }) {
  const dispatch = useDispatch();

  const upVoteHandler = (commentId, prevVoteType) => {
    dispatch(asyncUpVoteComment(threadId, commentId, authUser.id, prevVoteType));
  };

  const downVoteHandler = (commentId, prevVoteType) => {
    dispatch(asyncDownVoteComment(threadId, commentId, authUser.id, prevVoteType));
  };

  const neutralizeVoteHandler = (commentId, prevVoteType) => {
    dispatch(asyncNeutralizeVoteComment(threadId, commentId, authUser.id, prevVoteType));
  };

  return (
    <div className="comment-list">
      {
        comments.map((comment) => (
          <Comment key={comment.id} {...comment} authUser={authUser} upVote={upVoteHandler} downVote={downVoteHandler} neutralizeVote={neutralizeVoteHandler} />
        ))
      }
    </div>
  );
}

CommentList.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default CommentList;