import React from 'react';
import PropTypes from 'prop-types';

function CategoryList({ categoryList, changeCategory, activeCategory }) {
  return (
    <div className="category-list">
      {
        categoryList.map((category) => <button key={category} className={`category ${activeCategory === category ? 'active' : ''}`} onClick={() => changeCategory(category)}>#{category}</button>)
      }
    </div>
  );
}

CategoryList.propTypes = {
  categoryList: PropTypes.array.isRequired,
  changeCategory: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

export default CategoryList;