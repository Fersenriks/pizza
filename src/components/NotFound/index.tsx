import React from 'react';

import classes from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Ничего не найдено!</h1>
      <p className={classes.description}>Данная страница отсутствует в нашем интернет магазине.</p>
    </div>
  );
};

export default NotFound;
