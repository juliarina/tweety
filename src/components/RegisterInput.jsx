import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="register-input" onSubmit={onSubmitHandler}>
      <input type="text" placeholder="Name" required value={name} onChange={onNameChange}/>
      <input type="email" placeholder="Email" required value={email} onChange={onEmailChange}/>
      <input type="password" placeholder="Password" required value={password} onChange={onPasswordChange}/>
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;