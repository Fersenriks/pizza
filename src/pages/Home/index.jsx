import React, { memo, useEffect, useRef, useState } from 'react';

import qs from 'qs';
import Categories from '../../components/Categories/Categories';
import SortPizzas, { sortOptions } from '../../components/SortPizzas/SortPizzas';
import PizzaSkeleton from '../../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageCount, setFilters } from '../../redux/slices/filterSlice';
import Paginator from '../../components/Paginator';
import { fetchPizzas } from '../../redux/slices/pizzaSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    pizza: { items, loading, count },
  } = useSelector((state) => state);

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { categoryId, sortType, pageCount } = useSelector((state) => state.filter);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ categoryId, sortType, pageCount }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType.sortValue,
        categoryId,
        pageCount,
      });
      navigate('?' + queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortType, pageCount]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = sortOptions.find((obj) => obj.sortValue === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sortType,
        })
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, pageCount]);

  const onSelectPage = (page) => {
    dispatch(setPageCount(page));
  };

  return (
    <>
      <div className='content__top'>
        <Categories />
        <SortPizzas />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Paginator
        pageCount={Math.ceil(count)}
        onPageChange={(event) => onSelectPage(event.selected)}
      />
    </>
  );
};

export default memo(HomePage);
