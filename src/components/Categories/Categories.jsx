import React, { memo, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId } from '../../redux/slices/filterSlice';

const Categories = () => {
  const categoriesOptions = useMemo(
    () => ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'],
    []
  );

  const dispatch = useDispatch();
  const { categoryId } = useSelector(selectFilter);

  const handleSelectCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className='categories'>
      <ul>
        {categoriesOptions.map((category, index) => (
          <li
            onClick={() => handleSelectCategory(index)}
            className={categoryId === index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Categories);
