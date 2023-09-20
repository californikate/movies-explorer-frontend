// форма поиска, куда пользователь будет вводить запрос.

import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ searchQuery, onSearch, checkedShorts, onCheck }) {
  // После сабмита формы поиска производится валидация. 
  // Если в поле не введён текст, выводится ошибка «Нужно ввести ключевое слово».
  const [validation, setValidation] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchQuery  === '') {
      setValidation('Нужно ввести ключевое слово');
      return;
    }
    setValidation('');
    onSearch();
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form onSubmit={ handleSubmit } className="search-form__form">
          <div className="search-form__wrap">
          <span className="search-form__icon" />
            <input 
              type="search"
              placeholder="Фильм"
              className="search-form__input"
              autoComplete="off"
            />
            <button type="submit" className="search-form__button button">Найти</button>
          </div>
          <FilterCheckbox onCheck={ onCheck } checkedShorts={ checkedShorts } />
        </form>
        { validation && (<span className="search-form__validation">Нужно ввести ключевое слово</span>) }
      </div>
    </section>
  );
}

export default SearchForm;