function Register() {
  return (
    <section className="register">
      <h3 className="title title_theme_dark">Регистрация</h3>
      <form className="form register__form" name="form-register" id="form-register">
        <input type="email" className="form__item form__item_theme_dark" id="register-email" name="register-email" placeholder="Email" required />
        <input type="password" className="form__item form__item_theme_dark" id="register-password" name="register-password" placeholder="Пароль" required />
        <button type="submit" className="form__button form__button_theme_dark">Зарегистрироваться</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{'\u00A0'}
        <a className="register__link">Войти</a>
      </p>
    </section>
  );

}

export default Register;
