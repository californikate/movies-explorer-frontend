//  компонент страницы авторизации

import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Login() {
  return(
    <section className="auth">
      <form className="auth__form" action="#">
        <Link className="auth__logo-link" to={"/"}>
          <img className="auth__logo" src={ logo } alt="логотип сайта." />
        </Link>
        <h2 className="auth__title">Рады видеть!</h2>
        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          className="auth__form-input"
          required
        />
        <label for="password" className="lauth__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          className="auth__form-input"
          required
        />
        <button type="submit" className="auth__button button">Войти</button>
        <Link to="/sign-up" className="auth__link">Еще не зарегистрированы? Регистрация</Link>
      </form>
    </section>
  );
}

export default Login;