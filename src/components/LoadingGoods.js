import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingGoods = () => {
  return (
    <ContentLoader
      speed={3}
      width={250}
      height={435}
      viewBox="0 0 250 435"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="19" y="10" rx="5" ry="5" width="210" height="300" />
      <rect x="77" y="335" rx="5" ry="5" width="86" height="15" />
      <rect x="5" y="355" rx="6" ry="6" width="238" height="31" />
      <rect x="7" y="405" rx="6" ry="6" width="84" height="15" />
      <rect x="127" y="395" rx="6" ry="6" width="113" height="27" />
    </ContentLoader>
  );
};

export default LoadingGoods;
