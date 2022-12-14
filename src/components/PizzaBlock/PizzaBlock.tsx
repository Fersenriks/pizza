import React, { memo, useEffect, useMemo, useState } from 'react';

import { addPizza, selectCart } from '../../redux/slices/cartSlice';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

type PizzaBlockProps = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, price, title, imageUrl, sizes, types }) => {
  const dispatch = useAppDispatch();
  const [pizzaCount, setPizzaCount] = useState<number>(0);
  const [pizzaType, setPizzaType] = useState<number>(0);
  const [pizzaSize, setPizzaSize] = useState<number>(0);
  const { items } = useSelector(selectCart);

  const handleAddPizza = () => {
    setPizzaCount((prevState) => prevState + 1);
    dispatch(addPizza({ id, price, title, imageUrl, sizes, count: pizzaCount }));
  };

  const pizzaTypes = useMemo(() => ['Thin', 'Traditional'], []);

  useEffect(() => {
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return;
    }

    const amount = items[index].count;
    setPizzaCount(amount);
  }, []);

  return (
    <div className='pizza-block'>
      <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
      <h4 className='pizza-block__title'>{title}</h4>
      <div className='pizza-block__selector'>
        <ul>
          {types.map((type: number, index: number) => (
            <li
              className={pizzaType === index ? 'active' : ''}
              onClick={() => setPizzaType(type)}
              key={index}
            >
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, index: number) => (
            <li
              onClick={() => setPizzaSize(index)}
              className={pizzaSize === index ? 'active' : ''}
              key={index}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>by {price} ???</div>
        <div onClick={handleAddPizza} className='button button--outline button--add'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Add</span>
          {pizzaCount ? <i>{pizzaCount}</i> : null}
        </div>
      </div>
    </div>
  );
};

export default memo(PizzaBlock);
