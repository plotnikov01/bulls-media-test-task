import React from 'react';

import './button.scss';

export const Button = (props) => {
  const { type, title, onClick, className } = props;

  return (
    <button onClick={onClick} className={className ? className : 'button'} type={type}>
      {title}
    </button>
  );
};
