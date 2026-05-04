import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import AddPage from './pages/AddPage';
import { HiMiniTrophy } from 'react-icons/hi2';
import { TiHome } from 'react-icons/ti';
import { IoLogOut } from 'react-icons/io5';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreLoadProcess } from './states/isPreload/action';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';

function App() {
  const {
    authUser = null,
    isPreload = false
  } = useSelector((states) => ({ authUser: states.authUser, isPreload: states.isPreload }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreLoadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div>
        <Loading />
        <main>
          <Routes>
            <Route path="*" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Loading />
      <div className="sidebar">
        <nav>
          <Link to="/"><TiHome size="35"/></Link>
          <Link to="/leaderboards"><HiMiniTrophy size="30"/></Link>
          <div className="logout-btn">
            <button onClick={onSignOut}><IoLogOut size="33px"/></button>
          </div>
        </nav>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/new" element={<AddPage />}/>
          <Route path="/threads/:id" element={<DetailPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;