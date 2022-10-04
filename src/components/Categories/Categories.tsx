import React, { memo, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/slices/filterSlice';

type CategoriesProps = {
  onChangeCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({ onChangeCategory }) => {
  const categoriesOptions = useMemo<Array<string>>(
    () => ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'],
    []
  );

  const { categoryId } = useSelector(selectFilter);

  return (
    <div className='categories'>
      <ul>
        {categoriesOptions.map((category, index) => (
          <li
            onClick={() => onChangeCategory(index)}
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
