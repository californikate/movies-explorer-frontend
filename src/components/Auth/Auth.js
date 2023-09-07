import React from "react";
import './Auth.css';

import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

function Auth({ type }) {
  return (
    <section className="auth">
      <form className="auth__form" action="#">
        <Logo />
        <h2 className="auth__title">
          { type === "signin" ? "Рады видеть!" : "Добро пожаловать!" }
        </h2>
        { type !== "signin" && (
          <>
            <label for="name" className="auth__form-label">Имя</label>
            <input 
              id="name"
              name="name"
              type="name"
              minLength="2"
              maxLength="30"
              className="auth__form-input"
              required
            />
          </>
        )}
        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          className="auth__form-input"
          required
        />
        <label for="password" className="auth__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          className="auth__form-input"
          required
        />
        <span className="auth__form-error">Что-то пошло не так...</span>
        <>
          <button type="submit" className="auth__button button">
            { type === "signin" ? "Войти" : "Зарегистрироваться" }
          </button>
          <>
            <span>
              { type === "signin" ? "Еще не зарегистрированы?" : "Уже зарегистрированы?" }
            </span>
            <Link to={ type === "signin" ? "/signup" : "/signin" } className="auth__link">
              { type === "signin" ? "Регистрация" : "Войти" }
            </Link>
          </>
        </>
      </form>
    </section>
  );
}

export default Auth;