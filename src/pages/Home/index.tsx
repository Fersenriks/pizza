import React, { memo, useCallback, useEffect, useRef } from 'react';

import qs from 'qs';
import Categories from '../../components/Categories/Categories';
import SortPizzas, { sortOptions } from '../../components/SortPizzas/SortPizzas';
import PizzaSkeleton from '../../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  setPageCount,
  setFilters,
  selectFilter,
  setCategoryId,
  Sort,
} from '../../redux/slices/filterSlice';

import Paginator from '../../components/Paginator';
import { fetchPizzas, SearchFilterParams } from '../../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { selectCart } from '../../redux/slices/cartSlice';

type ItemType = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, loading, count } = useSelector((state: RootState) => state.pizza);
  const cart = useSelector(selectCart);

  const { search } = useLocation();

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { categoryId, sortBy, pageCount } = useSelector(selectFilter);

  const getPizzas = () => {
    dispatch(fetchPizzas({ categoryId, sortBy, pageCount }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortBy.sortValue,
        categoryId,
        pageCount,
      });
      navigate('?' + queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortBy, pageCount]);

  useEffect(() => {
    if (search) {
      const params = qs.parse(search.substring(1)) as unknown as SearchFilterParams;

      const sortBy: Sort =
        sortOptions.find((obj) => obj.sortValue === params.sortBy) || sortOptions[0];

      dispatch(
        setFilters({
          ...params,
          sortBy,
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
  }, [categoryId, sortBy, pageCount]);

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const handleSelectCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  return (
    <>
      <div className='content__top'>
        <Categories onChangeCategory={handleSelectCategory} />
        <SortPizzas />
      </div>
      <h2 className='content__title'>All pizzas</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((item: ItemType) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Paginator
        pageCount={Math.ceil(count)}
        onPageChange={(event) => onChangePage(event.selected)}
      />
    </>
  );
};

export default memo(HomePage);
