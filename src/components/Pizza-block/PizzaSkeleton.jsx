import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props) => (
  <ContentLoader
    className={'pizza-block'}
    speed={2}
    width={280}
    height={490}
    viewBox='0 0 280 490'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='120' cy='120' r='118' />
    <rect x='2' y='312' rx='8' ry='8' width='275' height='85' />
    <rect x='0' y='270' rx='8' ry='8' width='163' height='30' />
    <rect x='0' y='415' rx='8' ry='8' width='110' height='35' />
    <rect x='143' y='415' rx='8' ry='8' width='138' height='35' />
  </ContentLoader>
);

export default PizzaSkeleton;
