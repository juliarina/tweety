import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [comment, onCommentChange, setComment] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setComment('');
    addComment(comment);
  };

  return (
    <form className="comment-input" onSubmit={onSubmitHandler}>
      <textarea rows="4" className="comment-input_description" value={comment} onChange={onCommentChange} required></textarea>
      <button>Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;