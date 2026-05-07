import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <div className="login-input">
      <input type="email" placeholder="Email" required value={email} onChange={onEmailChange}/>
      <input type="password" placeholder="Password" required value={password} onChange={onPasswordChange}/>
      <button onClick={onSubmitHandler}>Login</button>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;