import React, { memo, useCallback, useEffect, useRef } from 'react';

import qs from 'qs';
import Categories from '../../components/Categories/Categories';
import SortPizzas, { sortOptions } from '../../components/SortPizzas/SortPizzas';
import PizzaSkeleton from '../../components/PizzaBlock/PizzaSkeleton';
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  setPageCount,
  setFilters,
  selectFilter,
  setCategoryId,
} from '../../redux/slices/filterSlice';
import Paginator from '../../components/Paginator';
import { fetchPizzas } from '../../redux/slices/pizzaSlice';

type ItemType = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @ts-ignore
  const { items, loading, count } = useSelector((state) => state.pizza);
  console.log(items);
  const { search } = useLocation();

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { categoryId, sortType, pageCount } = useSelector(selectFilter);

  const getPizzas = () => {
    // @ts-ignore
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
    if (search) {
      const params = qs.parse(search.substring(1));
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
