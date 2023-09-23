// форма поиска, куда пользователь будет вводить запрос.

import React, { useState} from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ query, setQuery, checkedShorts, setCheckedShorts, onSearch, onFilter }) {
  // После сабмита формы поиска производится валидация. 
  // Если в поле не введён текст, выводится ошибка «Нужно ввести ключевое слово».
  const [validation, setValidation] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query  === '') {
      setValidation(true);
    } else {
      setValidation(false);
      onSearch(query, checkedShorts);
    }
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form onSubmit={ handleSubmit } noValidate className="search-form__form">
          <div className="search-form__wrap">
          <span className="search-form__icon" />
            <input 
              id="search"
              type="search"
              placeholder="Фильм"
              className="search-form__input"
              value={ query }
              onChange={ handleInputChange }
              required
            />
            <button type="submit" className="search-form__button button">Найти</button>
          </div>
          <FilterCheckbox 
            checkedShorts={ checkedShorts } 
            setCheckedShorts={ setCheckedShorts } 
            query={ query } 
            onFilter={ onFilter } 
          />
        </form>
        { validation && (<span className="searchform__validation">Нужно ввести ключевое слово</span>) }
      </div>
    </section>
  );
}

export default SearchForm;