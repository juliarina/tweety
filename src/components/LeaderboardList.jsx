import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import PropTypes from 'prop-types';

function LeaderboardList({ leaderboard, userId }) {
  return (
    <div className="leaderboard-list">
      {
        leaderboard.map((item) => (
          <LeaderboardItem key={`leaderboard-item_${item.user.id}`} {...item} userId={userId} />
        ))
      }
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

export default LeaderboardList;