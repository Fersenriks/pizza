import React from 'react';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { roundTo } from 'round-to';
import { Link } from 'react-router-dom';
import { selectCart } from '../../redux/slices/cartSlice';

import classes from './Cart.module.scss';

const CartBottom: React.FC = () => {
  const { totalPrice, items } = useSelector(selectCart);

  const countTotalAmount = items.map((item) => item.count).reduce((sum, acc) => sum + acc, 0);

  return (
    <div className={classes.cart__bottom}>
      <div className={classes.cart__bottom_details}>
        <span>
          Amount: <b>{countTotalAmount ? countTotalAmount : 0}</b>
        </span>
        <span>
          Total price: <b>{roundTo(totalPrice, 2)} €</b>
        </span>
      </div>
      <div className={classes.cart__bottom_buttons}>
        <Link className={clsx(classes.button, classes.button__outlined)} to='/'>
          <svg
            width='8'
            height='14'
            viewBox='0 0 8 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 13L1 6.93015L6.86175 1'
              stroke='#D3D3D3'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Back to pizzas</span>
        </Link>
        <div className={classes.button}>
          <span>Order just now</span>
        </div>
      </div>
    </div>
  );
};

export default CartBottom;
