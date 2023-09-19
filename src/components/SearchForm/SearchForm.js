// форма поиска, куда пользователь будет вводить запрос.

import React from "react";
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="search-form">
      <div onSubmit={ (evt) => handleSubmit(evt) }className="search-form__container">
        <form className="search-form__form">
          <div className="search-form__wrap">
          <span className="search-form__icon" />
            <input 
              type="text"
              placeholder="Фильм"
              className="search-form__input"
              required
            />
            <button type="submit" className="search-form__button button">Найти</button>
          </div>
          <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;