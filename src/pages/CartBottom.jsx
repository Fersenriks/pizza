import React from 'react';
import classes from './Cart.module.scss';

const CartBottom = () => {
  return (
    <div className={classes.cart__bottom}>
      <div className={classes.cart__bottom_details}>
        <span>
          {' '}
          Всего пицц: <b>3 шт.</b>{' '}
        </span>
        <span>
          {' '}
          Сумма заказа: <b>900 ₽</b>{' '}
        </span>
      </div>
      <div className={classes.cart__bottom_buttons}>
        <a
          href='/'
          className={`${classes.button} ${classes.button__outline} ${classes.button__add}`}
        >
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

          <span>Вернуться назад</span>
        </a>
        <div className={`${classes.button} ${classes.pay_btn}`}>
          <span>Оплатить сейчас</span>
        </div>
      </div>
    </div>
  );
};

export default CartBottom;
