import React from "react";
import './Auth.css';
import Logo from '../Logo/Logo';

import { Link } from "react-router-dom";
import { useState } from "react";


function Auth({ type, handleRegister, handleAuthorize }) {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    type !== 'signin' && handleRegister(formValue);
    type === 'signin' && handleAuthorize(formValue);

    setFormValue({email: '', password: ''});
  }

  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">
        { type === "signin" ? "Рады видеть!" : "Добро пожаловать!" }
      </h1>
      <form onSubmit={ handleSubmit } className="auth__form" action="#">
        { type !== "signin" && (
          <>
            <label for="name" className="auth__form-label">Имя</label>
            <input 
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Введите имя"
              className="auth__form-input"
              value={ formValue.name} 
              onChange={ handleChange } 
              required
            />
          </>
        )}
        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
          className="auth__form-input"
          value={ formValue.email } 
          onChange={ handleChange }
          required
        />
        <label for="password" className="auth__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          minLength="6"
          maxLength="30"
          placeholder="••••••••••••••"
          className="auth__form-input"
          value={ formValue.password } 
          onChange={ handleChange }
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