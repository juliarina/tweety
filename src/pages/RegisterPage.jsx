import React from 'react';
import RegisterInput from '../components/RegisterInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section>
      <h2>Register</h2>
      <RegisterInput register={onRegister}/>
      <p>Already have account? <Link to="/">Login here</Link>.</p>
    </section>
  );
}

export default RegisterPage;