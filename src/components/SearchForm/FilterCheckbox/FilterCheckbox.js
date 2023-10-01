// Обратите внимание на фильтр с чекбоксом «Только короткометражки». 
// Для него можно воспользоваться отдельным управляемым компонентом
import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ query, checkedShorts, setCheckedShorts, onFilter }) {
  const handleCheckShorts = () => {
    setCheckedShorts(!checkedShorts);
    onFilter(query, !checkedShorts);
  }

  return (
    <label className="filter-checkbox">
      <input 
        className="filter-checkbox__input" 
        type="checkbox" 
        checked={ checkedShorts }
        onChange={ handleCheckShorts }
      />
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;