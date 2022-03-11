import React from 'react';

function Login() {
  return (
    <section className="login">
      <h3 className="title title_theme_dark">Вход</h3>
      <form className="form login__form" name="form-login" id="form-login">
        <input type="email" className="form__item form__item_theme_dark" id="login-email" name="login-email" placeholder="Email" required />
        <input type="password" className="form__item form__item_theme_dark" id="login-password" name="login-password" placeholder="Пароль" required />
        <button type="submit" className="form__button form__button_theme_dark">Войти</button>
      </form>
    </section>
  );
}

export default Login;
