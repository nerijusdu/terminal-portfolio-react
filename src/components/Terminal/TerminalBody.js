import React from 'react';

export default () => {
  return (
    <div className="Terminal__body">
      <div className="Terminal__text">Welcome!</div>
      <div className="Terminal__Prompt">
        <span className="Prompt__user">nerijus@ubuntu:</span>
        <span className="Prompt__location">~</span>
        <span className="Prompt__dollar">$</span>
        <span className="Prompt__cursor"></span>
      </div>
    </div>
  );
};
