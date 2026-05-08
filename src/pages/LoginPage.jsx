import React from 'react';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section>
      <h2>Login</h2>
      <LoginInput login={onLogin}/>
      <p>Don&apos;t have account? <Link to="/register">Register here</Link>.</p>
    </section>
  );
}

export default LoginPage;