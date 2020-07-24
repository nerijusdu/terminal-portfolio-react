import { useState } from 'react';

export default (initialValue, onKeyDown) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    onKeyDown
  };
};
