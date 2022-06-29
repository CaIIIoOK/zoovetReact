import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartOpen } from '../redux/actions/cartStatus';
import { clearUserDataAction } from '../redux/actions/setUserDataAction';
import { setLoginForHead } from '../redux/actions/setUserDataAction';
import fetchSearch from '../back-end-request/fetchSearch';
import removeCookie from '../back-end-request/removeCookie';
import { setSearchVal } from '../redux/actions/searchAction';

function Header() {
  return (
    <header className="header">
      <HeaderLogo />
      <HeaderTelephone />
      <HeaderMenu />
      <BurgerMenu />
      <HeaderSearch />
      <HeaderCart />
      <HeaderProfile />
    </header>
  );
}

function HeaderLogo() {
  return (
    <div className="header-logo">
      <a href="/">
        <img src="./img/logo.png" alt="" />
        <p>Ветеринарні препарати і зоотовари, гуртово-роздрібний інтернет-магазин</p>
      </a>
    </div>
  );
}

function HeaderTelephone() {
  return (
    <div className="telephone">
      <a href="tel:+380983243518">
        <i className="fas fa-mobile-alt"></i> +(380)-983-243-518{' '}
        <i className="fas fa-arrow-down"></i>
      </a>
      <p>
        <a href="tel:+380504447188" className="telTwo">
          <i className="fas fa-mobile-alt"></i> +(380)-504-447-188
        </a>
      </p>
    </div>
  );
}

function HeaderMenu() {
  return (
    <nav className="header-menu">
      <ul>
        <li>
          <NavLink exact="true" to="/" className="nav-link">
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorys" className="nav-link">
            Категорії товарів
          </NavLink>
        </li>
        <li>
          <a href="/goods" className="nav-link">
            Усі товари
          </a>
        </li>
        <li>
          <NavLink to="/delivery_info" className="nav-link">
            Способи доставки
          </NavLink>
        </li>
        <li>
          <NavLink to="/contacts" className="nav-link">
            Контакти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function BurgerMenu() {
  const [showMenu, setShowMenu] = React.useState(false);

  const showBurgerNav = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      {!showMenu && (
        <nav className="burger" onClick={showBurgerNav}>
          <i className="fas fa-bars"></i>
        </nav>
      )}
      {showMenu && (
        <>
          <nav className="burger-menu">
            <ul>
              <li>
                <NavLink exact="true" to="/" className="nav-link" onClick={showBurgerNav}>
                  Головна
                </NavLink>
              </li>
              <li>
                <NavLink to="/categorys" className="nav-link" onClick={showBurgerNav}>
                  Категорії товарів
                </NavLink>
              </li>
              <li>
                <a href="/goods" className="nav-link" onClick={showBurgerNav}>
                  Усі товари
                </a>
              </li>
              <li>
                <NavLink to="/delivery_info" className="nav-link" onClick={showBurgerNav}>
                  Способи доставки
                </NavLink>
              </li>
              <li>
                <NavLink to="/contacts" className="nav-link" onClick={showBurgerNav}>
                  Контакти
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="shadow" onClick={showBurgerNav}></div>
        </>
      )}
    </>
  );
}

function HeaderSearch() {
  const searchRefVal = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchOnsubmit = (e) => {
    e.preventDefault();
    if (searchRefVal.current.value.length >= 3) {
      dispatch(fetchSearch(searchRefVal.current.value));
      dispatch(setSearchVal(searchRefVal.current.value));
      navigate('/search?&search-name=' + searchRefVal.current.value, { replace: true });
      searchRefVal.current.value = '';
    }
  };

  return (
    <div className="search">
      <form onSubmit={(e) => searchOnsubmit(e)}>
        <input type="search" ref={searchRefVal} />
        <button type="submit" id="searchBtn">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}

function HeaderCart() {
  const dispatch = useDispatch();
  const totalCount = useSelector(({ cartReduce }) => cartReduce.totalCount);
  function toggleCartOpen() {
    dispatch(cartOpen(true));
    let scrollWidth = window.innerWidth - document.querySelector('body').offsetWidth;
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('body').style.paddingRight = scrollWidth + 'px';
  }

  return (
    <div className="cartImg" onClick={toggleCartOpen}>
      <button className="buttnCat">
        <img
          src="https://img.icons8.com/material-two-tone/48/000000/shopping-cart--v1.png"
          alt="cart"
        />
        {totalCount === 0 ? null : (
          <i className="cart-count">{totalCount > 999 ? 999 : totalCount}</i>
        )}
      </button>
    </div>
  );
}

function HeaderProfile() {
  const { login } = useSelector(({ userDataReduser }) => userDataReduser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [cookie] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  React.useEffect(() => {
    dispatch(setLoginForHead(cookie));
  }, []);

  const logOut = () => {
    dispatch(clearUserDataAction({}));
    dispatch(removeCookie());
    navigate('/user-login', { replace: true });
  };

  return (
    <div className="profile">
      {!login ? (
        <Link to="/user-login">
          <i className="fas fa-sign-in-alt"></i> Увійти
        </Link>
      ) : (
        <Link to="/my-office">
          <button className="header-button">
            <i className="fas fa-user-circle"></i> {login}
          </button>
        </Link>
      )}
      {!login ? (
        <Link to="/registration">Регістрація</Link>
      ) : (
        <button className="header-button" onClick={logOut}>
          Вийти
        </button>
      )}
    </div>
  );
}
export default Header;
