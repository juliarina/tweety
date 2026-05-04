import React from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import { LiaCommentsSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function PostItem({ classCategory, id, category, title, body, upVotesBy, downVotesBy, totalComments, user, createdAt, voteType, upVote, downVote, neutralizeVote }) {
  const upVoteButtonClickHandler = () => {
    voteType === 1 ? neutralizeVote(id, voteType) : upVote(id, voteType);
  };

  const downVoteButtonClickHandler = () => {
    voteType === -1 ? neutralizeVote(id, voteType) : downVote(id, voteType);
  };

  return (
    <div className={`post-item ${classCategory}`}>
      <p className={`post-item_category ${classCategory} category`}>#{category}</p>
      <h3 className={`post-item_title ${classCategory}`}>
        {
          classCategory === 'list' ?
            <Link to={`/threads/${id}`}>{title}</Link> : title
        }
      </h3>
      <div className={`post-item_description ${classCategory}`}>{parser(body)}</div>
      <div className="post-item_info">
        <div>
          <button onClick={upVoteButtonClickHandler}>
            {
              voteType === 1 ?
                <AiFillLike className="like-icons" />
                :
                <AiOutlineLike className="like-icons" />
            }
          </button>
          <p>{upVotesBy.length}</p>
        </div>
        <div>
          <button onClick={downVoteButtonClickHandler}>
            {
              voteType === -1 ?
                <AiFillDislike className="dislike-icons" />
                :
                <AiOutlineDislike className="dislike-icons" />
            }
          </button>
          <p>{downVotesBy.length}</p>
        </div>
        <div><LiaCommentsSolid className="comment-icons"/> <p>{totalComments}</p></div>
        <div>
          <p>created by</p>
          <img className="post-item_user-avatar" src={user.avatar} alt="user avatar" />
          <strong>{user.name}</strong>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>
      { classCategory === 'list' && <hr /> }
    </div>
  );
}

PostItem.propTypes = {
  classCategory: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  voteType: PropTypes.number.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default PostItem;