import React from 'react';
import './Terminal.css';
import TerminalToolbar from './TerminalToolbar';
import TerminalBody from './TerminalBody';
import TerminalContext, {initialContext} from './logic/TerminalContext';

export default () => {
  return (
    <TerminalContext.Provider value={initialContext}>
      <div className="Terminal">
        <TerminalToolbar />
        <TerminalBody />
      </div>
    </TerminalContext.Provider>
  );
};
