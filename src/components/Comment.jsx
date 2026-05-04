import React from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';

function Comment({ id, owner, createdAt, content, upVotesBy, downVotesBy, voteType, upVote, downVote, neutralizeVote }) {
  const upVoteButtonClickHandler = () => {
    voteType === 1 ? neutralizeVote(id, voteType) : upVote(id, voteType);
  };

  const downVoteButtonClickHandler = () => {
    voteType === -1 ? neutralizeVote(id, voteType) : downVote(id, voteType);
  };

  return (
    <div className="comment">
      <div className="comment_header">
        <div className="comment_user">
          <img className="comment_avatar" src={owner.avatar} alt="user avatar" />
          <h4 className="comment_user_name">{owner.name}</h4>
        </div>
        <p className="comment_date">{postedAt(createdAt)}</p>
      </div>
      <p className="comment_description">{parser(content)}</p>
      <div className="comment-buttons">
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
      </div>
      <hr />
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  voteType: PropTypes.number.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default Comment;