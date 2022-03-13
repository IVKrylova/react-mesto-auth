import React from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Register(props) {
  // запускаем валидацию формы
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onRegister({
      email: values.email,
      password: values.password,
    });
  }

  // сброс значений инпутов формы
  React.useEffect(_ => {
    resetForm();
  }, [props.isRegistred]);

  return (
    <section className="register">
      <h3 className="title title_theme_dark">Регистрация</h3>
      <form onSubmit={handleSubmit} className="form register__form" name="form-register" id="form-register" noValidate>
        <input type="email" className="form__item form__item_theme_dark" id="register-email" name="email" placeholder="Email" required
              value={values.email}
              onChange={handleChange} />
        <span className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
          {isValid ? '' : errors.email}
        </span>
        <input type="password" className="form__item form__item_theme_dark" id="register-password" name="password" placeholder="Пароль" required
              value={values.password}
              onChange={handleChange} />
        <span className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
          {isValid ? '' : errors.password}
        </span>
        <button disabled={!isValid} type="submit" className="form__button form__button_theme_dark">Зарегистрироваться</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{'\u00A0'}
        <Link to="/sign-in" className="register__link">Войти</Link>
      </p>
    </section>
  );

}

export default Register;
