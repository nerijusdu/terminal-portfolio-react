import React from 'react';

export default () => {
  return (
    <div className="Terminal__Toolbar">
      <p className="Toolbar__user">Title goes here</p>
      <div className="Toolbar__buttons">
        <button className="Toolbar__button">&#9723;</button>
        <button className="Toolbar__button">&#9472;</button>
        <button className="Toolbar__button Toolbar__button--exit">&#10005;</button>
      </div>
    </div>
  );
};
