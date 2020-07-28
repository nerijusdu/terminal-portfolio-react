import React, { useContext } from 'react';
import TerminalContext from './logic/TerminalContext';

export default ({showUser, currentPath, children}) => {
  const context = useContext(TerminalContext);
  let path = currentPath || context.currentPath;

  if (path.startsWith(context.homePath)) {
    path = path.replace(context.homePath, '~');
  }
  return (
    <div className="Terminal__Prompt">
      {showUser ? (
        <span>
          <span className="Prompt__user">guest@ubuntu:</span>
          <span className="Prompt__location">{path}</span>
          <span className="Prompt__dollar">$</span>  
        </span>
      ) : null}
      {children}
    </div>
  );
};
