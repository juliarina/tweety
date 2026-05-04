import React, { useEffect } from 'react';
import PostItem from '../components/PostItem';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail, clearThreadDetailActionCreator, asyncAddComment, asyncUpVoteThreadDetail, asyncDownVoteThreadDetail, asyncNeutralizeVoteThreadDetail } from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [id, dispatch]);

  const onAddCommentHandler = (content) => {
    dispatch(asyncAddComment({ id, content }));
  };

  const threadDetailModified = {
    ...threadDetail,
    voteType: threadDetail?.upVotesBy.includes(authUser.id) ? 1 : threadDetail?.downVotesBy.includes(authUser.id) ? -1 : 0,
    comments: threadDetail?.comments.map((comment) => ({
      ...comment,
      voteType: comment?.upVotesBy.includes(authUser.id) ? 1 : comment?.downVotesBy.includes(authUser.id) ? -1 : 0
    })),
  };

  const upVoteHandler = (id, prevVoteType) => {
    dispatch(asyncUpVoteThreadDetail(id, authUser.id, prevVoteType));
  };

  const downVoteHandler = (id, prevVoteType) => {
    dispatch(asyncDownVoteThreadDetail(id, authUser.id, prevVoteType));
  };

  const neutralizeVoteHandler = (id, prevVoteType) => {
    dispatch(asyncNeutralizeVoteThreadDetail(id, authUser.id, prevVoteType));
  };


  if (!threadDetail) {
    return null;
  }

  return (
    <section>
      <PostItem classCategory="details" {...threadDetailModified} user={threadDetail.owner} totalComments={threadDetail.comments.length} upVote={upVoteHandler} downVote={downVoteHandler} neutralizeVote={neutralizeVoteHandler} authUser={authUser}/>
      <h3 className="comment-input_title">Beri Komentar</h3>
      <CommentInput addComment={onAddCommentHandler}/>
      <h3 className="comment-container_title">Komentar ({threadDetail.comments.length})</h3>
      <CommentList comments={threadDetailModified.comments} authUser={authUser} threadId={threadDetail.id}/>
    </section>
  );
}

export default DetailPage;