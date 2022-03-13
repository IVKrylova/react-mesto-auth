import React from 'react';

function Login(props) {
  // хуки состояния значения инпутов
  const [ values, setValues ] = React.useState({ email: '', password: '' });

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

  // обработчик проверки изменения инпута
  const handleChange = (evt) => {
    const {name, value} = evt.target
    setValues({...values, [name]: value });
  };

  // сброс значений инпутов формы
  React.useEffect(_ => {
    setValues({ email: '', password: '' })
  }, [props.loggedIn]);

  return (
    <section className="login">
      <h3 className="title title_theme_dark">Вход</h3>
      <form onSubmit={handleSubmit} className="form login__form" name="form-login" id="form-login">
        <input type="email" className="form__item form__item_theme_dark" id="login-email" name="email" placeholder="Email" required
              value={values.email}
              onChange={handleChange} />
        <input type="password" className="form__item form__item_theme_dark" id="login-password" name="password" placeholder="Пароль" required
              value={values.password}
              onChange={handleChange} />
        <button type="submit" className="form__button form__button_theme_dark">Войти</button>
      </form>
    </section>
  );
}

export default Login;
