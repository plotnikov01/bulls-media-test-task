import React from 'react';

import './input.scss';

export const Input = React.forwardRef(({ type, placeholder, error, helperText, ...rest }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        className={`input ${error ? 'error' : ''}`}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error && <p className="error-message">{helperText}</p>}
    </div>
  );
});
