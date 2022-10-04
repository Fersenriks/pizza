import React from 'react';

import classes from './CircleIcon.module.scss';

type CircleIcon = {
  children: JSX.Element;
};

const CircleIcon: React.FC<CircleIcon> = ({ children }) => {
  return <div className={classes.root}>{children}</div>;
};

export default CircleIcon;
