import React, { memo, useEffect, useRef, useState } from 'react';

import qs from 'qs';
import Categories from '../../components/Categories/Categories';
import SortPizzas, { sortOptions } from '../../components/Sort-pizzas/SortPizzas';
import PizzaSkeleton from '../../components/Pizza-block/PizzaSkeleton';
import PizzaBlock from '../../components/Pizza-block/PizzaBlock';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { setPageCount, setFilters } from '../../redux/slices/filterSlice';
import Paginator from '../../components/Paginator';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagePag, setPagePag] = useState(0);

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const {
    filter: { categoryId, sortType, pageCount },
  } = useSelector((state) => state);

  const fetchPizzas = () => {
    axios
      .get(
        `https://62cb703e3e924a012866f7d4.mockapi.io/items?${
          categoryId && `category=${categoryId}`
        }${
          sortType.sortValue &&
          `&sortBy=${sortType.sortValue}&order=asc&page=${pageCount + 1}&limit=8`
        }`
      )
      .then((response) => {
        setItems(response.data.items);
        setPagePag(response.data.count / Math.round(8));
        setLoading(false);
      });
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
      fetchPizzas();
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
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Paginator
        pageCount={Math.ceil(pagePag)}
        onPageChange={(event) => onSelectPage(event.selected)}
      />
    </>
  );
};

export default memo(HomePage);
