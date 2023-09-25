import React, { useEffect, useState } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';

import { Link } from 'react-router-dom';

import { EMAIL_REGEX } from '../../utils/const';
import { NAME_REGEX } from '../../utils/const';

function Auth({ type, authTitle, handleRegister, errorMessage }) {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formValue;
  const [formValidation, setFormValidation] = useState(false);
  const [isEmptyForm, setIsEmptyForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    authTitle === 'Регистрация' && handleRegister(formValue);
    setFormValue({name: '', email: '', password: ''});
  }
  // валидация формы
  useEffect(() => {
    const inputValidation = () => {
      const nameValidation = NAME_REGEX.test(name.trim()) && name.trim().length >=2 && name.trim().length <= 30;
      const emailValidation = EMAIL_REGEX.test(email.trim());
      const passwordValidation = password.trim().length >=6 && password.trim().length <= 30;

      return nameValidation && emailValidation && passwordValidation;
    };

    setFormValidation(inputValidation());
    setIsEmptyForm(name.trim() === '' || email.trim() === '' || password.trim() === '');
  }, [name, email, password]);

  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">{ authTitle }</h1>
      <form onSubmit={ handleSubmit } className="auth__form" action="#">
        <label for="name" className="auth__form-label">Имя</label>
        <input 
          id="name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          placeholder="Введите имя"
          className="auth__form-input"
          value={ name } 
          onChange={ handleChange } 
          required
        />
        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
          className="auth__form-input"
          value={ email } 
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
          value={ password } 
          onChange={ handleChange }
          required
        />

        <span className="auth__form-error">{ errorMessage }</span>
        
        <button 
          disabled={ isEmptyForm || !formValidation } 
          type="submit" 
          className="auth__button button"
        >
          Зарегистрироваться
        </button>
        <div className="auth__link-wrap">
          <span className="auth__link-span">
            Уже зарегистрированы?
          </span>
          <Link to={"/signin"} className="auth__link link">
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Auth;