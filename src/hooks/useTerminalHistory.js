import { useState } from 'react';

export default (initialValue) => {
  const [items, setItems] = useState(initialValue);

  return {
    items,
    append: (item) => setItems([...items, item]),
    clear: () => setItems([])
  };
};
