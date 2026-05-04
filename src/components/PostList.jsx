import React from 'react';
import PostItem from './PostItem';
import { useDispatch } from 'react-redux';
import { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralizeVoteThread } from '../states/threads/action';
import PropTypes from 'prop-types';

function PostList({ threads, authUser }) {
  const dispatch = useDispatch();

  const upVoteHandler = (id, prevVoteType) => {
    dispatch(asyncUpVoteThread(id, authUser.id, prevVoteType));
  };

  const downVoteHandler = (id, prevVoteType) => {
    dispatch(asyncDownVoteThread(id, authUser.id, prevVoteType));
  };

  const neutralizeVoteHandler = (id, prevVoteType) => {
    dispatch(asyncNeutralizeVoteThread(id, authUser.id, prevVoteType));
  };

  return (
    <div className="post-list">
      {
        threads.map((thread) => (
          <PostItem key={thread.id} {...thread} authUser={authUser} upVote={upVoteHandler} downVote={downVoteHandler} neutralizeVote={neutralizeVoteHandler} classCategory="list"/>
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  threads: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default PostList;