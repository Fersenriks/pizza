import React from 'react';

import { Link } from 'react-router-dom';
import EmptyCartImg from '../../../assets/img/empty-cart.png';

import classes from './CartEmpty.module.scss';

const CartEmpty = () => {
  return (
    <div className={classes.cart__empty}>
      <h2>
        Empty cart <icon>😕</icon>
      </h2>
      <p>
        You probably haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src={EmptyCartImg} alt='Empty cart' />
      <Link to='/' className='button button--black'>
        <span>Back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
