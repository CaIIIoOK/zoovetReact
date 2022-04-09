import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingCategory = () => {
  return (
    <ContentLoader
      speed={3}
      width={365}
      height={200}
      viewBox="0 0 365 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="10" y="15" rx="8" ry="8" width="325" height="15" />
      <rect x="100" y="35" rx="6" ry="6" width="145" height="145" />
    </ContentLoader>
  );
};

export default LoadingCategory;
