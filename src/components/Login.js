import React, { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Login(props) {
  // запускаем валидацию формы
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onLogin({
      email: values.email,
      password: values.password,
    });
  }

  // сброс значений инпутов формы
  useEffect(_ => {
    resetForm();
  }, [props.loggedIn]);

  return (
    <section className="login">
      <h3 className="title title_theme_dark">Вход</h3>
      <form onSubmit={handleSubmit} className="form login__form" name="form-login" id="form-login">
        <input type="email" className="form__item form__item_theme_dark" id="login-email" name="email" placeholder="Email" required
              value={values.email}
              onChange={handleChange} />
        <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
          {!isValid && errors.email}
        </span>
        <input type="password" className="form__item form__item_theme_dark" id="login-password" name="password" placeholder="Пароль" required
              value={values.password}
              onChange={handleChange} />
        <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>
          {!isValid && errors.password}
        </span>
        <button disabled={!isValid} type="submit" className="form__button form__button_theme_dark">Войти</button>
      </form>
    </section>
  );
}

export default Login;
