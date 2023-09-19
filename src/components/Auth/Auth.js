import React from "react";
import './Auth.css';

import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

function Auth({ type }) {
  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">
        { type === "signin" ? "Рады видеть!" : "Добро пожаловать!" }
      </h1>
      <form className="auth__form" action="#">
        { type !== "signin" && (
          <>
            <label for="name" className="auth__form-label">Имя</label>
            <input 
              id="name"
              name="name"
              type="name"
              minLength="2"
              maxLength="30"
              placeholder="Виталий"
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
          placeholder="pochta@yandex.ru"
          className="auth__form-input"
          required
        />
        <label for="password" className="auth__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          minLength="6"
          maxLength="25"
          placeholder="••••••••••••••"
          className="auth__form-input"
          required
        />

        { type !== "signin" && (
          <span className="auth__form-error">Что-то пошло не так...</span>
        )}
        
        <button type="submit" className={ type === "signin" ? "auth__button auth__button_type_signin button" : "auth__button button" }>
          { type === "signin" ? "Войти" : "Зарегистрироваться" }
        </button>
        <div className="auth__link-wrap">
          <span className="auth__link-span">
            { type === "signin" ? "Еще не зарегистрированы?" : "Уже зарегистрированы?" }
          </span>
          <Link to={ type === "signin" ? "/signup" : "/signin" } className="auth__link link">
            { type === "signin" ? "Регистрация" : "Войти" }
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Auth;