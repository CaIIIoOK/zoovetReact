import React from 'react';
import { Header, Footer, Cart, Container } from './components/';
import { useSelector, useDispatch } from 'react-redux';
import fetchUserData from './back-end-request/fetchUserData';

function App() {
  const { hash } = useSelector(({ userDataReduser }) => userDataReduser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (hash) {
      console.log('проверка');
      dispatch(fetchUserData(hash));
    }
  }, [hash]);
  return (
    <div className="main">
      <Header />
      <Cart />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
