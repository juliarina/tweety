import React, { useEffect } from 'react';
import LeaderboardList from '../components/LeaderboardList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboard } from '../states/leaderboard/action';

function LeaderboardsPage() {
  const leaderboard = useSelector((state) => state.leaderboard);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboard());
  }, [dispatch]);

  if (leaderboard === null) {
    return null;
  }

  return (
    <section>
      <h2>Active User Ranking</h2>
      <LeaderboardList leaderboard={leaderboard} userId={authUser.id}/>
    </section>
  );
}

export default LeaderboardsPage;