import React from 'react';

const OptionItem = ({ option, onSelect }) => {
  return (
    <div>
      <input
        type="radio"
        id={`option-${option.id}`}
        name="option"
        onChange={() => onSelect(option.id)}
      />
      <label htmlFor={`option-${option.id}`}>{option.text}</label>
    </div>
  );
};

export default OptionItem;
