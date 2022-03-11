import logo from '../images/header-logo.svg';

function Header(props) {
  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        {!props.loggedIn && <a className="header__link-registration">Регистрация</a>}
      </div>
    </header>
  );
}

export default Header;
