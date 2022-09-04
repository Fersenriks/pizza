import React, { useRef, useState } from 'react';

import { ReactComponent as SearchSvg } from '../../assets/img/search.svg';
import { ReactComponent as CancelSvg } from '../../assets/img/cancel.svg';
import debounce from 'lodash.debounce';

import classes from './SearchPiazzas.module.scss';

const SearchPizzas = ({ ...restProps }) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setInputValue(str);
    }, 1000),
    []
  );

  const changeInputValue = (event) => {
    setValue(event.target.value);
    updateSearchValue(value);
  };

  const onCancel = () => {
    setInputValue('');
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={classes.root}>
      <SearchSvg className={classes.search} />
      <input
        value={value}
        ref={inputRef}
        className={classes.root}
        onChange={changeInputValue}
        {...restProps}
      />
      {inputValue && <CancelSvg onClick={onCancel} className={classes.cancel} />}
    </div>
  );
};

export default SearchPizzas;
