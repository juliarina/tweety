import PropTypes from 'prop-types';
import React from 'react';

function LeaderboardItem({ user: { id, name, avatar }, score, userId }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-user">
        <img className="leaderboard-user_avatar" src={avatar} alt="user avatar" />
        <p>{name} {id === userId ? <strong>(You)</strong> : ''}</p>
      </div>
      <p className="leaderboard-score">{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
};

export default LeaderboardItem;