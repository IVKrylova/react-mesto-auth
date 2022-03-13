import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  // хуки состояния значения инпутов
  const [ values, setValues ] = React.useState({ email: '', password: '' });

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

  // обработчик проверки изменения инпута
  const handleChange = (evt) => {
    const {name, value} = evt.target
    setValues({...values, [name]: value });
  };

  // сброс значений инпутов формы
  React.useEffect(_ => {
    setValues({ email: '', password: '' })
  }, [props.isRegistred]);

  return (
    <section className="register">
      <h3 className="title title_theme_dark">Регистрация</h3>
      <form onSubmit={handleSubmit} className="form register__form" name="form-register" id="form-register">
        <input type="email" className="form__item form__item_theme_dark" id="register-email" name="email" placeholder="Email" required
              value={values.email}
              onChange={handleChange} />
        <input type="password" className="form__item form__item_theme_dark" id="register-password" name="password" placeholder="Пароль" required
              value={values.password}
              onChange={handleChange} />
        <button type="submit" className="form__button form__button_theme_dark">Зарегистрироваться</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{'\u00A0'}
        <Link to="/sign-in" className="register__link">Войти</Link>
      </p>
    </section>
  );

}

export default Register;
