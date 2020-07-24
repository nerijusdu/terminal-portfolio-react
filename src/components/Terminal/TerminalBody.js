import React, { useRef } from 'react';
import commandHandler from '../../terminal/commandHandler';
import useFormInput from '../../hooks/useFormInput'
import useTerminalHistory from '../../hooks/useTerminalHistory'

export default () => {
  const command = useFormInput('', e => {
    if (e.key !== 'Enter') {
      return;
    }

    commandHandler(terminalHistory, command.value);
    command.onChange({target: {value: ''}});

    setTimeout(
      () => containerRef.current.scrollTop = containerRef.current.scrollHeight,
      100
    );
  });
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const terminalHistory = useTerminalHistory(['Welcome!']);

  return (
    <div
      className="Terminal__body"
      onClick={() => inputRef.current.focus()}
      ref={containerRef}
    >
      {terminalHistory.items.map((text, index) => (
        <div className="Terminal__text" key={index}>{text}</div>
      ))}
      <div className="Terminal__Prompt">
        <span className="Prompt__user">nerijus@ubuntu:</span>
        <span className="Prompt__location">~</span>
        <span className="Prompt__dollar">$</span>
        <input
          className="Terminal__text Terminal__input"
          ref={inputRef}
          {...command}
        />
      </div>
    </div>
  );
};
