import logo from '../images/header-logo.svg';
import React from 'react';
import { useLocation } from "react-router";

function Header() {
  // получаем текущий URL
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        {currentUrl === '/sign-in' && <a className="header__link">Регистрация</a>}
        {currentUrl === '/sign-up' && <a className="header__link">Войти</a>}
      </div>
    </header>
  );
}

export default Header;
