import React from 'react';

export const Button = ({ Icon, button_name, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {Icon && <Icon/>}
      <p className=''>{button_name}</p>
    </button>
  );
};
