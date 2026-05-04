import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';
import { LuPlus } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import asyncPopulateUserAndTalks from '../states/shared/action';
import CategoryList from '../components/CategoryList';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUserAndTalks());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    voteType: thread.upVotesBy.includes(authUser.id) ? 1 : thread.downVotesBy.includes(authUser.id) ? -1 : 0
  }));

  let filteredThreadList;

  if (category !== '') {
    filteredThreadList = threadList.filter((thread) => thread.category === category);
  }

  const categoryList = [...new Set(threads.map((thread) => thread.category))];

  const categoryChangesHandler = (categoryValue) => {
    setCategory(category === categoryValue ? '' : categoryValue);
  };

  return (
    <section className="home-page">
      <h3 className="category-list_title">Popular Category</h3>
      <CategoryList categoryList={categoryList} changeCategory={categoryChangesHandler} activeCategory={category}/>
      <h2>Available Discussion</h2>
      <PostList threads={filteredThreadList ?? threadList} authUser={authUser}/>
      <Link to="/new" className="add-button"><LuPlus className="add-button_icon"/></Link>
    </section>
  );
}

export default HomePage;