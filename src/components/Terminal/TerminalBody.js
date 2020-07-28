import React, { useRef } from 'react';
import commandHandler from './logic/commandHandler';
import useFormInput from '../../hooks/useFormInput';
import useTerminalHistory from './hooks/useTerminalHistory';
import TerminalPrompt from './TerminalPrompt';

export default () => {
  const terminalObj = useTerminalHistory([{text: 'Welcome!'}]);
  const command = useFormInput('', e => {
    if (e.key !== 'Enter') {
      return;
    }

    commandHandler(terminalObj, command.value);
    command.onChange({target: {value: ''}});

    setTimeout(
      () => containerRef.current.scrollTop = containerRef.current.scrollHeight,
      100
    );
  });
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <div
      className="Terminal__body"
      onClick={() => inputRef.current.focus()}
      ref={containerRef}
    >
      {terminalObj.items.map((item, index) => (
        <TerminalPrompt
          key={index}
          showUser={item.showUser}
          currentPath={item.currentPath}
        >
          <div className="Terminal__text">{item.text}</div>
        </TerminalPrompt>
      ))}
      <TerminalPrompt showUser={true}>
        <input
          className="Terminal__text Terminal__input"
          ref={inputRef}
          {...command}
        />
      </TerminalPrompt>
    </div>
  );
};
