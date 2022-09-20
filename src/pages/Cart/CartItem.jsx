import React, { memo } from 'react';
import classes from './Cart.module.scss';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { decPizza, incPizza, removePizza } from '../../redux/slices/cartSlice';

const CartItem = ({ count, title, price, id, imageUrl }) => {
  const dispatch = useDispatch();

  const pizzaItemInc = () => {
    dispatch(incPizza(id));
  };

  const pizzaItemDec = () => {
    dispatch(decPizza(id));
  };

  const removePizzas = () => {
    dispatch(removePizza(id));
  };

  return (
    <div className={classes.cart__item}>
      <div className={classes.cart__item_title}>
        <div className={classes.cart__item_img}>
          <img className={classes.pizza_block__image} src={imageUrl} alt='Pizza' />
        </div>
        <div>
          <h3>{title}</h3>
          <p>тонкое тесто, 26 см.</p>
        </div>
      </div>
      <div className={classes.cart__item_tools}>
        <div className={classes.cart__item_count}>
          <div onClick={pizzaItemDec} className={clsx(classes.button, classes.button__circle)}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>
          </div>
          <b>{count}</b>
          <div onClick={pizzaItemInc} className={clsx(classes.button, classes.button__circle)}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              />
            </svg>
          </div>
        </div>
        <div className={classes.cart__item_price}>
          <b>{price * count} €</b>
        </div>
        <div className={classes.cart__item_remove}>
          <div onClick={removePizzas} className={clsx(classes.button, classes.button__circle)}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#adabab'
              />
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#adabab'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItem);
