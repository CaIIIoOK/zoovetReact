import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartOpen } from '../redux/actions/cartStatus';

function Header() {
  return (
    <header className="header">
      <HeaderLogo />
      <HeaderTelephone />
      <HeaderMenu />
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
            Головна{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorys" className="nav-link">
            Категорії товарів
          </NavLink>
        </li>
        <li>
          <NavLink to="/goods" className="nav-link">
            Усі товари
          </NavLink>
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

function HeaderSearch() {
  return (
    <div className="search">
      <form action="/search">
        <input type="text" />
        <Link to="/search" className="nav-link">
          <button type="submit" id="searchBtn">
            <i className="fas fa-search"></i>
          </button>
        </Link>
      </form>
    </div>
  );
}

function HeaderCart() {
  const dispatch = useDispatch();
  const totalCount = useSelector(({ cartReduce }) => cartReduce.totalCount);

  function toggleCartOpen() {
    dispatch(cartOpen(true));
  }

  return (
    <div className="cartImg" onClick={toggleCartOpen}>
      <button className="buttnCat">
        <img
          src="https://img.icons8.com/material-two-tone/48/000000/shopping-cart--v1.png"
          alt="cart"
        />
        {totalCount === 0 ? null : <i className="cart-count">{totalCount}</i>}
      </button>
    </div>
  );
}

function HeaderProfile() {
  return (
    <div className="profile">
      <Link to="/user-login">
        <i className="fas fa-sign-in-alt"></i> Войти
      </Link>
      <Link to="/registration">Регистрация</Link>
    </div>
  );
}
export default Header;
