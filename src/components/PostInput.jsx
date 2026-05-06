import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function PostInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addThread({ title, category, body });
  };
  return (
    <form className="post-input" onSubmit={onSubmitHandler}>
      <input className="post-input_title" type="text" placeholder="Title" value={title} onChange={onTitleChange} required/>
      <input className="post-input_category" type="text" placeholder="Category" value={category} onChange={onCategoryChange}/>
      <textarea rows="4" className="post-input_description" placeholder="Write something ..." type="text" value={body} onChange={onBodyChange} required/>
      <button>Create</button>
    </form>
  );
}

PostInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default PostInput;