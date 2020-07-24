import React from 'react';
import './Terminal.css';
import TerminalToolbar from './TerminalToolbar';
import TerminalBody from './TerminalBody';

export default () => {
  return (
    <div className="Terminal">
      <TerminalToolbar />
      <TerminalBody />
    </div>
  );
};
