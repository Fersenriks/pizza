import React, { memo, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSortValue } from '../../redux/slices/filterSlice';

export const sortOptions = [
  { label: 'Popularity', sortValue: 'rating' },
  { label: 'Price', sortValue: 'price' },
  { label: 'Name', sortValue: 'title' },
];

const SortPizzas = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sortRef = useRef(null);

  const {
    filter: { sortType },
  } = useSelector((state) => state);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  });

  const handleOpenSort = (event) => {
    event.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  const handleSelectSort = (sortObj) => {
    dispatch(setSortValue(sortObj));
    setOpen(false);
  };

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          transform={open ? 'rotate(180)' : ''}
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={(event) => handleOpenSort(event)}>{sortType.label}</span>
      </div>
      {open && (
        <div className='sort__popup'>
          <ul>
            {sortOptions.map((obj, index) => (
              <li
                key={index}
                onClick={() => handleSelectSort(obj)}
                className={obj.label === sortType.label ? 'active' : ''}
              >
                {obj.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(SortPizzas);
