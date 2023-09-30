import React, { useEffect, useState } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/const';
import { NAME_REGEX } from '../../utils/const';

function Auth({ authTitle, handleRegister }) {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formValue;
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
    authTitle === 'Регистрация' && handleRegister(data);
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
  }, [name, email, password]);

  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">{ authTitle }</h1>
      <form onSubmit={ handleSubmit(handleSubmitForm) } className="auth__form" action="#">
        <label for="name" className="auth__form-label">Имя</label>
        <input 
          id="name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          placeholder="Введите имя"
          className="auth__form-input"
          //value={ name } 
          {...register('name', {
            required: 'Необходимо заполнить',
            pattern: NAME_REGEX,
            minLength: 2,
            maxLength: 30
          })}
        />
        <span isActive={ errors.name } className="auth__form-error" >
          { errors.name? errors.name.message : '' }
        </span>

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