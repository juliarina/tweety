import React from 'react';
import PostInput from '../components/PostInput';
import { asyncAddThread } from '../states/threads/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addNewThreadHandler = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  return (
    <section>
      <h2>Create new conversation</h2>
      <PostInput addThread={addNewThreadHandler}/>
    </section>
  );
}

export default AddPage;