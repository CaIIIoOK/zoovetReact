import React from 'react';

import { Header, Footer, Cart, Container } from './components/';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);

  function cartToggle() {
    setCartOpened(!cartOpened);
  }

  return (
    <div className="main">
      <Header onOpenCart={cartToggle} />
      <Cart onClose={cartToggle} status={cartOpened} />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
