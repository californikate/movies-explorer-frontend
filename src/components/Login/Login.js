//  компонент страницы авторизации

import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login() {
  return(
    <section className="login">
      <form className="login__form" action="#">
        <Link className="login__logo-link" to={"/"}>
          <img className="login__logo" src={ logo } alt="логотип сайта." />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <label for="email" className="login__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          className="login__form-input"
          required
        />
        <label for="password" className="login__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          className="login__form-input"
          required
        />
        <button type="submit" className="login__button button">Войти</button>
        <Link to="/sign-up" className="login__link">Еще не зарегистрированы? Регистрация</Link>
      </form>
    </section>
  );
}

export default Login;