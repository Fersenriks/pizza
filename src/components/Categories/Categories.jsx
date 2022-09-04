import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

const Categories = () => {
  const categoriesOptions = useMemo(
    () => ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'],
    []
  );

  const dispatch = useDispatch();
  const {
    filter: { categoryId },
  } = useSelector((state) => state);

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

export default Categories;
