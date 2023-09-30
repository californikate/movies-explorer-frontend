import React, { useEffect, useState } from 'react';
import './Auth.css';
import Logo from '../Logo/Logo';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/const';

function Auth({ authTitle, handleAuthorize }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formValue;
  const [formValidation, setFormValidation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }, 
  } = useForm();

  const handleSubmitForm = (data) => {
    console.log('data', data);
    authTitle === 'Вход' && handleAuthorize(data);
    setFormValue({ email: '', password: ''});
  }
  // валидация формы
  useEffect(() => {
    const inputValidation = () => {
      const emailValidation = EMAIL_REGEX.test(email.trim());
      const passwordValidation = password.trim().length >=6 && password.trim().length <= 30;

      return emailValidation && passwordValidation;
    };

    setFormValidation(inputValidation());
  }, [email, password]);

  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">{ authTitle }</h1>
      <form onSubmit={ handleSubmit(handleSubmitForm) } className="auth__form" action="#">
        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
          className="auth__form-input"
          //value={ email } 
          {...register('email', {
            required: 'Необходимо заполнить',
            pattern: EMAIL_REGEX
          })}
        />
        <span isActive={ errors.email } className="auth__form-error" >
          { errors.email ? errors.email.message : '' }
        </span>

        <label for="password" className="auth__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          minLength="6"
          maxLength="30"
          placeholder="••••••••••••••"
          className="auth__form-input"
          //value={ password } 
          {...register('password', {
            required: 'Необходимо заполнить',          
            minLength: 6,
            maxLength: 30
          })}
        />
        <span isActive={ errors.password } className="auth__form-error" >
          { errors.password ? errors.password.message : '' }
        </span>
        

        <button 
          //disabled={ !formValidation } 
          type="submit" 
          className="auth__button auth__button_type_signin button"
        >
          Войти
        </button>
        <div className="auth__link-wrap">
          <span className="auth__link-span">
            Еще не зарегистрированы?
          </span>
          <Link to={"/signup"} className="auth__link link">
            Регистрация
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Auth;