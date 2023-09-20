// Обратите внимание на фильтр с чекбоксом «Только короткометражки». 
// Для него можно воспользоваться отдельным управляемым компонентом
import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({ checkedShorts, onCheck }) {
  return (
    <label className="filter-checkbox">
      <input 
        className="filter-checkbox__input" 
        type="checkbox" 
        checked={ checkedShorts }
        onChange={ onCheck }
      />
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;